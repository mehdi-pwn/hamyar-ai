import { query } from "@lib/db";
import logger from "@utils/logger";
import jwt from "jsonwebtoken";
import moment from "moment";

const isUserExists = async (phoneNumber) => {
  try {
    const user = await query(
      `
        SELECT id FROM users WHERE phone = ?
        `,
      [phoneNumber]
    );

    if (user[0]) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      error,
    });
  }
};
const generateCode = () => {
  let min = 10000;
  let max = 99999;
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString().padStart(5, "0");
};
const sendMessage = async (number, code) => {
  const sms_reciever = number.replace(/^0+/, "+98");

  if (process.env.SEND_CODE_DEBUG === "false") {
    const sms = await fetch("https://api.sms.ir/v1/send/verify", {
      body: JSON.stringify({
        templateId: process.env.SMS_IDENT,
        mobile: sms_reciever,
        parameters: [
          {
            name: "code",
            value: code,
          },
        ],
      }),
      headers: {
        Accept: "application/json",
        "x-api-key": process.env.SMS_API_KEY,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const sms_result = await sms.json();

    return sms_result;
  }
};
export default async function handler(req, res) {
  switch (req.body.request) {
    case "send": {
      try {
        const num = req.body.phoneNumber;
        const token = req.cookies.token;

        try {
          const decoded = jwt.verify(token, process.env.AUTH_SECRET);
          return res.status(401).json({ status: "fail", error: "auth" });
        } catch (error) {}

        if (!num || isNaN(num))
          return res.status(200).json({
            status: "fail",
            error: "no-phone",
          });

        const userExists = await isUserExists(num);

        if (!userExists) {
          const randomNumber = generateCode();
          const codeDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

          const sms_result = await sendMessage(num, randomNumber);
          if (sms_result.status != 1) {
            logger.info(
              `USER_NUM:${num} tried to register. But failed: sms not sent.`
            );
            return res.status(500).json({
              status: "fail",
              error: "sms-fail",
            });
          }

          const results = await query(
            `
        INSERT INTO users (phone, code, code_datetime, plan_history, tool_limits)
        VALUES (?, ?, ?, '[]', '{}')
        `,
            [num, randomNumber, codeDateTime]
          );
          logger.info(`USER_NUM:${num} tried to register. Success`);
          res.status(200).json({
            status: "success",
          });
        } else {
          const user = await query(
            `
          SELECT code_datetime, code_allow_datetime FROM users WHERE phone = ?
          `,
            [num]
          );
          let oldCodeTime = moment(user[0].code_datetime).unix();
          let nowTime = moment().unix();

          const timeDiff = nowTime - oldCodeTime;

          if (timeDiff < 120) {
            logger.info(
              `USER_NUM:${num} tried to login. But failed: old code not expired`
            );
            return res.status(200).json({
              status: "success",
              noCode: "true",
            });
          }

          const randomNumber = generateCode();
          const codeDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

          const sms_result = await sendMessage(num, randomNumber);
          if (sms_result.status != 1) {
            logger.info(
              `USER_NUM:${num} tried to login. But failed: sms not sent.`
            );
            return res.status(500).json({
              status: "fail",
              error: "sms-fail",
            });
          }

          const code = await query(
            `
        UPDATE users SET code = ?, code_datetime = ? WHERE phone = ?
        `,
            [randomNumber, codeDateTime, num]
          );
          logger.info(`USER_NUM:${num} tried to login. Succes.`);
          res.status(200).json({
            status: "success",
          });
        }
      } catch (error) {
        logger.info(`USER_NUM:${num} tried to signin. But failed: ${error}`);
        return res.status(500).json({
          status: "fail",
          error: "catch",
          msg: error,
        });
      }
      break;
    }
    case "resend": {
      const token = req.cookies.token;

      try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        return res.status(401).json({ status: "fail", error: "auth" });
      } catch (error) {}
      try {
        const num = req.body.phoneNumber;
        if (!num || isNaN(num))
          return res.status(401).json({
            status: "fail",
            error: "no-phone",
          });

        const userExists = await isUserExists(num);
        if (!userExists) {
          logger.info(
            `USER_NUM:${num} tried to resend-code. But failed: User not found.`
          );
          return res.status(401).json({
            status: "fail",
            error: "not-found",
          });
        }
        //check if is not banned at the time
        const user = await query(
          `
          SELECT code_datetime, code_allow_datetime FROM users WHERE phone = ?
          `,
          [num]
        );

        const earlierAllowCodeDateTime = moment(
          user[0].code_allow_datetime
        ).unix();
        let nowTime1 = moment().unix();

        if (nowTime1 < earlierAllowCodeDateTime + 3 * 3600 + 30 * 60) {
          return res.status(200).json({
            status: "fail",
            error: "code-banned-5",
          });
        }

        let oldCodeTime = moment(user[0].code_datetime).unix();
        let nowTimeResend = moment().unix();

        const timeDiffResend = nowTimeResend - oldCodeTime;

        if (timeDiff < 120) {
          logger.info(
            `USER_NUM:${num} tried to resend-code. But failed: old code not expired.`
          );
          return res.status(200).json({
            status: "fail",
            error: "code-not-expired",
          });
        }

        const randomNumber = generateCode();
        const codeDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

        const sms_result = await sendMessage(num, randomNumber);
        if (sms_result.status != 1) {
          logger.info(
            `USER_NUM:${num} tried to resend-code. But failed: sms not sent.`
          );
          return res.status(500).json({
            status: "fail",
            error: "sms-fail",
          });
        }

        const results = await query(
          `
        UPDATE users SET code = ?, code_datetime = ?, code_tried = 0, code_allow_datetime = NULL WHERE phone = ?
        `,
          [randomNumber, codeDateTime, num]
        );
        logger.info(`USER_NUM:${num} tried to resend-code. Success.`);
        res.status(200).json({
          status: "success",
        });
      } catch (error) {
        console.log(error);
        logger.info(
          `USER_NUM:${num} tried to resend-code. But failed: ${error}`
        );
        return res.status(500).json({
          status: "fail",
          error,
        });
      }
      break;
    }
    case "verify": {
      const num = req.body.phoneNumber;
      const token = req.cookies.token;

      try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        return res.status(401).json({ status: "fail", error: "auth" });
      } catch (error) {}

      try {
        const userExists = await isUserExists(num);
        if (!userExists)
          return res.status(401).json({
            status: "fail",
            error: "not-found",
            num,
          });

        const code = req.body.code;

        if (!num || isNaN(num) || !code || isNaN(code))
          return res.status(403).json({
            status: "fail",
            error: "not-valid-num",
          });

        const user = await query(
          `
        SELECT code, code_datetime, code_tried, code_allow_datetime FROM users
        WHERE phone = ?
        `,
          [num]
        );

        let earlierAllowCodeTime = moment(user[0].code_allow_datetime).unix();
        let nowTime1 = moment().unix();

        if (nowTime1 < earlierAllowCodeTime + 3 * 3600 + 30 * 60) {
          logger.info(
            `USER_NUM:${num} tried to verify. But failed: code-banned-5`
          );
          return res.status(200).json({
            status: "fail",
            error: "code-banned-5",
          });
        }

        let oldCodeTime = moment(user[0].code_datetime).unix();
        let nowTime = moment().unix();

        if (nowTime - oldCodeTime > 120) {
          logger.info(
            `USER_NUM:${num} tried to verify. But failed: code-expired`
          );
          return res.status(200).json({
            status: "fail",
            error: "code-expired",
          });
        }

        if (code == user[0].code) {
          logger.info(`USER_NUM:${num} tried to verify. Succes. CODE:${code}`);
          res.status(200).json({
            status: "success",
          });
        } else {
          const codeTried = user[0].code_tried + 1;
          if (codeTried > 3) {
            const later5Mins = moment()
              .add(5, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");

            await query(
              `
            UPDATE users SET code_tried = ?, code_allow_datetime = ? WHERE phone = ?`,
              [codeTried, later5Mins, num]
            );
            logger.info(
              `USER_NUM:${num} tried to verify. But failed: Code entered more than 3 times and user banned for 5 mins`
            );
            return res.status(403).json({
              status: "fail",
              error: "code-banned-5",
            });
          } else {
            await query(
              `
            UPDATE users SET code_tried = ? WHERE phone = ?`,
              [codeTried, num]
            );
            logger.info(
              `USER_NUM:${num} tried to verify. But failed: Incorrect code: ${code}`
            );
            return res.status(200).json({
              status: "fail",
              error: "code-incorrect",
            });
          }
        }
      } catch (error) {
        console.log(error);
        logger.info(`USER_NUM:${num} tried to verify. But failed: ${error}`);
        return res.status(500).json({
          status: "fail",
          error,
        });
      }
      break;
    }
    case "verified": {
      const token = req.cookies.token;

      try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        return res.status(401).json({ status: "fail", error: "auth" });
      } catch (error) {}
      try {
        const num = req.body.phoneNumber;

        const isExist = await isUserExists(num);

        if (!num || isNaN(num) || num == undefined || !isExist)
          return res.status(500).json({
            status: "fail",
          });

        const update = await query(
          `
        UPDATE users
        SET code = -1, code_datetime = null, code_tried = 0, code_allow_datetime = null
        WHERE phone = ?
        `,
          [num]
        );

        const user = await query(
          `
        SELECT id,phone,name,plan FROM users WHERE phone = ?
        `,
          [num]
        );

        const { id, phone, name, plan } = user[0];

        const token = jwt.sign(
          { id, phone, name, plan },
          process.env.AUTH_SECRET,
          { expiresIn: "2h" }
        );
        res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly`);
        logger.info(`USER_NUM:${num} verified.`);

        res.status(200).json({
          status: "success",
        });
      } catch (error) {
        console.log(error);
        logger.info(
          `USER_NUM:${num} tried to be verified. But failed: ${error}`
        );

        return res.status(500).json({ status: "fail", error });
      }
      break;
    }
    default: {
      let ipAddress = req.headers["x-real-ip"];
      if (!ipAddress) {
        ipAddress = req.headers["x-forwarded-for"]?.split(",")[0];
      }
      logger.info(
        `Auth api rejected due to invalid inner request. IP:${ipAddress}`
      );

      res.status(500).json({
        status: "fail",
        message: "no request detected",
      });
    }
  }
}

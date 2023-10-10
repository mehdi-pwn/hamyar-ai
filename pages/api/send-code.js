import { query } from "@lib/db";
import jwt from "jsonwebtoken";

const isUserExists = async (phoneNumber) => {
  try {
    const user = await query(
      `
        SELECT * FROM users WHERE phone = ?
        `,
      [phoneNumber]
    );

    if (user[0]) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error,
    });
  }
};
const generateCode = () =>
  Math.floor(Math.random() * 100000)
    .toString()
    .slice(-5);

export default async function handler(req, res) {
  switch (req.body.request) {
    case "send": {
      try {
        const num = req.body.phoneNumber;
        const token = req.cookies.token;

        try {
          const decoded = jwt.verify(token, process.env.AUTH_SECRET);
          return res.status(200).json({ status: "fail", error: "auth" });
        } catch (error) {}

        if (!num || isNaN(num))
          return res.status(200).json({
            status: "fail",
            error: "no-phone",
          });

        const userExists = await isUserExists(num);
        if (!userExists) {
          const randomNumber = generateCode();
          const codeDateTime = new Date().toISOString().slice(0, 19);

          const results = await query(
            `
        INSERT INTO users (phone, code, code_datetime, plan_history, tool_limits)
        VALUES (?, ?, ?, '[]', '{}')
        `,
            [num, randomNumber, codeDateTime]
          );
          res.status(200).json({
            status: "success",
            code: randomNumber,
          });
        } else {
          const randomNumber = generateCode();
          const codeDateTime = new Date().toISOString().slice(0, 19);

          const code = await query(
            `
        UPDATE users SET code = ?, code_datetime = ? WHERE phone = ?
        `,
            [randomNumber, codeDateTime, num]
          );
          res.status(200).json({
            status: "success",
            code: randomNumber,
          });
        }
      } catch (error) {
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
        return res.status(200).json({ status: "fail", error: "auth" });
      } catch (error) {}
      try {
        const num = req.body.phoneNumber;
        if (!num || isNaN(num))
          return res.status(500).json({
            status: "fail",
            error: "no-phone",
          });

        const userExists = await isUserExists(num);
        if (!userExists)
          return res.status(200).json({
            status: "fail",
            error: "not-found",
          });
        //check if is not banned at the time
        const user = await query(
          `
          SELECT code_datetime, code_allow_datetime FROM users WHERE phone = ?
          `,
          [num]
        );

        const codeAllowDateTime = user[0].code_allow_datetime;

        if (!codeAllowDateTime) {
          const earlierAllowCodeDateTime = new Date(codeAllowDateTime);

          const earlierUTCHours = earlierAllowCodeDateTime.getUTCHours();
          earlierAllowCodeDateTime.setUTCHours(earlierUTCHours + 3);
          earlierAllowCodeDateTime.setUTCMinutes(
            earlierAllowCodeDateTime.getUTCMinutes() + 30
          );

          const now = new Date().getTime();
          const newer = earlierAllowCodeDateTime.getTime();

          if (now < newer) {
            return res.status(200).json({
              status: "fail",
              error: "code-banned-5",
            });
          }
        }

        const oldCodeDate = user[0].code_datetime;
        const oldDateObject = new Date(oldCodeDate);

        const oldUTCHours = oldDateObject.getUTCHours();
        oldDateObject.setUTCHours(oldUTCHours + 3);
        oldDateObject.setUTCMinutes(oldDateObject.getUTCMinutes() + 30); //! THIS SECTION MIGHT BE NEEDED TO CHANGE AFTER PRODUCTION

        const nowTime = new Date().getTime();
        const oldTime = oldDateObject.getTime();

        const timeDiff = nowTime - oldTime;

        if (timeDiff < 120000) {
          return res.status(200).json({
            status: "fail",
            error: "code-not-expired",
          });
        }

        const randomNumber = generateCode();
        const codeDateTime = new Date().toISOString().slice(0, 19);
        const results = await query(
          `
        UPDATE users SET code = ?, code_datetime = ?, code_tried = 0, code_allow_datetime = NULL WHERE phone = ?
        `,
          [randomNumber, codeDateTime, num]
        );
        res.status(200).json({
          status: "success",
          code: randomNumber,
        });
      } catch (error) {
        console.log(error);
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
        return res.status(200).json({ status: "fail", error: "auth" });
      } catch (error) {}

      try {
        const userExists = await isUserExists(num);
        if (!userExists)
          return res.status(200).json({
            status: "fail",
            error: "not-found",
            num,
          });

        const code = req.body.code;

        if (!num || isNaN(num) || !code || isNaN(code))
          return res.status(500).json({
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

        const codeAllowDateTime = user[0].code_allow_datetime;

        if (!codeAllowDateTime) {
          const earlierAllowCodeDateTime = new Date(codeAllowDateTime);

          const earlierUTCHours = earlierAllowCodeDateTime.getUTCHours();
          earlierAllowCodeDateTime.setUTCHours(earlierUTCHours + 3);
          earlierAllowCodeDateTime.setUTCMinutes(
            earlierAllowCodeDateTime.getUTCMinutes() + 30
          );

          const now = new Date().getTime();
          const newer = earlierAllowCodeDateTime.getTime();

          if (now < newer) {
            return res.status(200).json({
              status: "fail",
              error: "code-banned-5",
            });
          }
        }

        const oldCodeDate = user[0].code_datetime;
        const oldDateObject = new Date(oldCodeDate);

        const oldUTCHours = oldDateObject.getUTCHours();
        oldDateObject.setUTCHours(oldUTCHours + 3);
        oldDateObject.setUTCMinutes(oldDateObject.getUTCMinutes() + 30); //! THIS SECTION MIGHT BE NEEDED TO CHANGE AFTER PRODUCTION

        const nowTime = new Date().getTime();
        const oldTime = oldDateObject.getTime();

        const timeDiff = nowTime - oldTime;

        if (timeDiff > 120000) {
          return res.status(200).json({
            status: "fail",
            error: "code-expired",
          });
        }

        if (code == user[0].code) {
          res.status(200).json({
            status: "success",
          });
        } else {
          var codeTried = user[0].code_tried;
          ++codeTried;
          if (codeTried > 3) {
            let later5Mins = new Date(new Date().getTime() + 5 * 60000);
            let later5minsString = later5Mins.toISOString().slice(0, 19);

            await query(
              `
            UPDATE users SET code_tried = ?, code_allow_datetime = ? WHERE phone = ?`,
              [codeTried, later5minsString, num]
            );
            return res.status(200).json({
              status: "fail",
              error: "code-banned-5",
            });
          } else {
            await query(
              `
            UPDATE users SET code_tried = ? WHERE phone = ?`,
              [codeTried, num]
            );
            return res.status(200).json({
              status: "fail",
              error: "code-incorrect",
            });
          }
        }
      } catch (error) {
        console.log(error);
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
        return res.status(200).json({ status: "fail", error: "auth" });
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
        SELECT * FROM users WHERE phone = ?
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
        res.status(200).json({
          status: "success",
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "fail", error });
      }
      break;
    }
    default: {
      res.status(500).json({
        status: "fail",
        message: "no request detected",
      });
    }
  }
}

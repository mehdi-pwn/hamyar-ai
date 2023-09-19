//TODO: pre- checks if code is already sent whithin 2 mins
import { query } from "@lib/db";
export default async function handler(req, res) {
  switch (req.body.request) {
    case "send": {
      const num = req.body.phoneNumber;
      if (!num || isNaN(num) || num == undefined)
        return res.status(500).json({
          status: "fail",
          message: "no phone number detected",
        });
      const randomNumber = Math.floor(Math.random() * 100000)
        .toString()
        .slice(-5);

      const results = await query(
        `
        INSERT INTO users (phone, code, plan_history)
        VALUES (?, ?, '{}')
        `,
        [num, randomNumber]
      );
      res.status(200).json({
        status: "success",
        code: randomNumber, // TODO: REMOVE + CLIENT SIDE
      });
      break;
    }
    case "send-login-code": {
      const num = req.body.phoneNumber;

      if (!num || isNaN(num) || num == undefined)
        return res.status(500).json({
          status: "fail",
          message: "no phone number detected",
        });

      const randomNumber = Math.floor(Math.random() * 100000)
        .toString()
        .slice(-5);

      const code = await query(
        `
        UPDATE users SET code = ? WHERE phone = ?
        `,
        [randomNumber, num]
      );

      res.status(200).json({
        status: "success",
        code: randomNumber, // TODO: REMOVE + CLIENT SIDE
      });
      break;
    }
    case "verify": {
      const num = req.body.phoneNumber;
      const code = req.body.code;

      if (
        !num ||
        isNaN(num) ||
        num == undefined ||
        !code ||
        isNaN(code) ||
        code == undefined
      )
        return res.status(500).json({
          status: "fail",
        });

      //TODO: Handle if code sent 100 years before!
      const user = await query(
        `
        SELECT code FROM users
        WHERE phone = ?
        `,
        [num]
      );

      if (code == user[0].code) {
        res.status(200).json({
          accepted: true,
        });
      } else {
        //TODO: Handle if tried more than 3 time and block
        //TODO: And if tried one phone number more than 5 times (bar resi shavad) in a day by one ip, banip
        res.status(200).json({
          accepted: false,
        });
      }

      break;
    }
    case "verified": {
      const num = req.body.phoneNumber;

      if (!num || isNaN(num) || num == undefined)
        return res.status(500).json({
          status: "fail",
        });

      //TODO: Do pre-register data adding in this query:
      const user = await query(
        `
        UPDATE users
        SET code = -1
        WHERE phone = ?
        `,
        [num]
      );
      res.status(200).json({
        status: "success",
      });
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

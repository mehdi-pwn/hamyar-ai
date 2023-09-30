import { query } from "@lib/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(500).json({ status: "fail", error: "Invalid request" });

  const token = req.cookies.token;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.AUTH_SECRET);
  } catch (error) {
    return res.status(200).json({ status: "fail", error: "no-auth" });
  }
  const userId = decoded.id;

  switch (req.body.type) {
    case "get-name": {
      try {
        const user = await query(
          `
        SELECT name FROM users WHERE id = ?
        `,
          [userId]
        );

        if (user[0].name) {
          return res.status(200).json({
            status: "success",
            name: user[0].name,
          });
        }
      } catch (error) {
        return res.status(200).json({ status: "fail", error });
      }
      break;
    }
    case "set-name": {
      try {
        const { name } = req.body;
        const user = await query(
          `
        UPDATE users SET name = ? WHERE id = ?
        `,
          [name, userId]
        );

        return res.status(200).json({
          status: "success",
        });
      } catch (error) {
        return res.status(200).json({ status: "fail", error });
      }
      break;
    }

    default:
      break;
  }
}

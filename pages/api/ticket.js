import { query } from "@lib/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    const token = req.cookies.token;
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.AUTH_SECRET);
    } catch (error) {
      return res.status(200).json({ status: "fail", error: "no-auth" });
    }

    const userId = decoded.id;
    const message = req.body.message;
    const insert = await query(
      `
        INSERT INTO tickets (sender_id, message) VALUES (?, ?)
        `,
      [userId, message]
    );
    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error,
    });
  }
}

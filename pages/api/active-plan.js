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
    const user = await query(
      `
        SELECT plan FROM users WHERE id = ?
        `,
      [userId]
    );

    if (user[0].plan == 2) {
      return res.status(200).json({
        status: "active",
      });
    } else {
      return res.status(200).json({
        status: "not-ative",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "خطایی رخ داد",
    });
  }
}

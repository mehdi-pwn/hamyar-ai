import { query } from "@lib/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const token = req.cookies.token;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.AUTH_SECRET);
  } catch (error) {
    return res.status(200).json({ status: "fail", error: "no-auth" });
  }

  const userId = decoded.id;

  try {
    const { prompt, response } = req.body;

    const user = await query(
      `
      INSERT INTO prompts (user_id, prompt, response) VALUES (?, ?, ?)`,
      [userId, prompt, response]
    );
  } catch (error) {
    return res.status(500).json({ status: "fail", error });
  }
}

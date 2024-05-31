import { query } from "@lib/db";
import logger from "@utils/logger";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const token = req.cookies.token;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.AUTH_SECRET);
  } catch (error) {
    return res.status(401).json({ status: "fail", error: "no-auth" });
  }

  const userId = decoded.id;

  try {
    const { prompt, response } = req.body;

    const user = await query(
      `
      INSERT INTO prompts (user_id, prompt, response) VALUES (?, ?, ?)`,
      [userId, prompt, response]
    );

    const new_id = await query(
      `
    SELECT id FROM prompts WHERE user_id = ? ORDER BY id DESC LIMIT 1
    `,
      [userId]
    );

    logger.info(
      `USER:${userId}'s new ai response just save to DB with ID:${new_id[0].id}.`
    );
  } catch (error) {
    return res.status(500).json({ status: "fail", error });
  }
}

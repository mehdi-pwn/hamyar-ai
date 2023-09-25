import { query } from "@lib/db";
export default async function handler(req, res) {
  try {
    const { userId, prompt, response } = req.body;

    const user = await query(
      `
      INSERT INTO prompts (user_id, prompt, response) VALUES (?, ?, ?)`,
      [userId, prompt, response]
    );
  } catch (error) {
    return res.status(500).json({ status: "fail", error });
  }
}

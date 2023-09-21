import { query } from "@lib/db";
export default async function handler(req, res) {
  const userId = req.body.userId;
  const user = await query(
    `
        SELECT * FROM users WHERE id = ?
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
}

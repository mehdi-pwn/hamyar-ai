import { query } from "@lib/db";
export default async function handler(req, res) {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "خطایی رخ داد",
    });
  }
}

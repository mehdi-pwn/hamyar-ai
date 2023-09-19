import { query } from "@lib/db";
export default async function handler(req, res) {
  const phoneNumber = req.body.phoneNumber;
  const user = await query(
    `
        SELECT * FROM users WHERE phone = ?
        `,
    [phoneNumber]
  );

  if (user[0]) {
    return res.status(200).json({
      status: "found",
    });
  } else {
    return res.status(200).json({
      status: "not-found",
    });
  }
}

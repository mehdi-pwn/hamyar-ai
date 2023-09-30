import { query } from "@lib/db";
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
    const user = await query(
      `
        SELECT * FROM users WHERE id = ?
        `,
      [userId]
    );

    if (!user[0]) {
      return res.status(200).json({
        status: "not-found",
      });
    }

    if (user[0].plan === 2) {
      var today = new Date(),
        expireDate = user[0].plan_history;
      var expireDateParts = expireDate.split("-");
      var date = new Date(
        expireDateParts[0],
        expireDateParts[1] - 1,
        expireDateParts[2]
      );
      const isExpireDatePassed = today > date;

      if (!isExpireDatePassed)
        return res.status(200).json({
          status: "active",
        });
    }

    const response = await fetch(
      "https://api.novinopay.com/payment/ipg/v2/request",
      {
        method: "POST",
        body: {
          merchant_id: "test",
          amount: 500000,
          callback_url: "http://localhost:3000/verify",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error,
    });
  }
}

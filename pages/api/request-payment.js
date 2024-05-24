import { query } from "@lib/db";
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
    const user = await query(
      `
        SELECT plan FROM users WHERE id = ?
        `,
      [userId]
    );

    if (!user[0]) {
      return res.status(403).json({
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
      "https://api.zarinpal.com/pg/v4/payment/request.json",
      {
        method: "POST",
        body: {
          merchant_id: process.env.ZARINPAL_MERCHANT,
          amount: 50000,
          currency: "IRT",
          description: "خرید پلن حرفه ای میهن اِی آی",
          callback_url: process.env.ZARINPAL_CALLBACK,
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

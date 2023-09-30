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
    const auth = req.body.auth;

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
      "https://api.novinopay.com/payment/ipg/v2/verification",
      {
        method: "POST",
        body: {
          merchant_id: "test",
          amount: 500000,
          authority: auth,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data.status != 100 || data.status != 101) {
      return res
        .status(200)
        .json({ status: "payment-error", message: data.message });
    } else {
      const TOOL_USAGE_LIMITS = { "article-content": 10 }; ////

      let today = new Date();
      let futureDate = new Date(today.getTime() + 31 * 24 * 60 * 60 * 1000);
      let expireDate = futureDate.toISOString().slice(0, 10);

      let oldHistory = JSON.parse(user.plan_history);
      oldHistory.push({
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
        msg: "plan-2:start",
        endDate: expireDate,
      });

      const updateUserPlan = await query(
        `
        UPDATE users SET plan = 2, plan_expire_date = ?, plan_history = ?, tool_limits = ? WHERE id = ?
        `,
        [
          expireDate,
          JSON.stringify(oldHistory),
          JSON.stringify(TOOL_USAGE_LIMITS),
          userId,
        ]
      );
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "fail", error });
  }
}

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
    const auth = req.body.auth;

    const user = await query(
      `
        SELECT plan,plan_history FROM users WHERE id = ?
        `,
      [userId]
    );

    if (!user[0]) {
      logger.info(
        `USER:${userId} tried to buy package. But failed: no account`
      );
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
        logger.info(
          `USER:${userId} tried to buy package. But failed: already have the package`
        );
      return res.status(200).json({
        status: "active",
      });
    }

    const response = await fetch(
      "https://api.zarinpal.com/pg/v4/payment/verify.json",
      {
        method: "POST",
        body: {
          merchant_id: process.env.ZARINPAL_MERCHANT,
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
      logger.info(
        `USER:${userId} tried to buy package. But failed: payment failed (!100|!101)`
      );
      return res
        .status(200)
        .json({ status: "payment-error", message: data.message });
    } else if (data.status == 100) {
      const WORDS = 5000; ////

      let today = new Date();
      let futureDate = new Date(today.getTime() + 31 * 24 * 60 * 60 * 1000); //TODO: Marketing
      let expireDate = futureDate.toISOString().slice(0, 10);

      let oldHistory = JSON.parse(user.plan_history);
      oldHistory.push({
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
        msg: "plan-2:start",
        endDate: expireDate,
      });

      logger.info(
        `USER:${userId} tried to buy package. Succes. Added ${WORDS} words.`
      );

      const updateUserPlan = await query(
        `
        UPDATE users SET plan = 2, plan_expire_date = ?, plan_history = ?, words = ? WHERE id = ?
        `,
        [expireDate, JSON.stringify(oldHistory), WORDS, userId]
      );
      return res.status(200).json(data);
    } else if (code == 101) {
      logger.info(
        `USER:${userId} tried to buy package (second request). Returned`
      );
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    logger.info(`USER:${userId} tried to buy package. Failed: ${error}`);
    return res.status(500).json({ status: "fail", error });
  }
}

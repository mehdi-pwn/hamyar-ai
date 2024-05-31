import { query } from "@lib/db";
import logger from "@utils/logger";
import jwt from "jsonwebtoken";
import moment from "moment";

export default async function handler(req, res) {
  const userId = decoded.id;
  try {
    const token = req.cookies.token;
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.AUTH_SECRET);
    } catch (error) {
      return res.status(401).json({ status: "fail", error: "no-auth" });
    }

    const message = req.body.message;

    const oldTickets = await query(
      `
      SELECT date from tickets WHERE sender_id = ? LIMIT 3
      `,
      [userId]
    );

    const dates = [
      moment(oldTickets[0].date, "YYYY-MM-DD HH:mm:ss"),
      moment(oldTickets[1].date, "YYYY-MM-DD HH:mm:ss"),
      moment(oldTickets[2].date, "YYYY-MM-DD HH:mm:ss"),
    ];
    const now = moment();

    if (
      Math.abs(now.diff(dates[0], "days")) < 1 &&
      Math.abs(now.diff(dates[1], "days")) < 1 &&
      Math.abs(now.diff(dates[2], "days")) < 1
    ) {
      logger.info(
        `USER:${userId} tried to register a new ticket. But failed: reached max limit in one day`
      );

      return res.status(200).json({
        status: "fail",
      });
    }

    const insert = await query(
      `
        INSERT INTO tickets (sender_id, message) VALUES (?, ?)
        `,
      [userId, message]
    );
    const new_id = await query(
      `
    SELECT id FROM tickets WHERE sender_id = ? ORDER BY id DESC LIMIT 1
    `,
      [userId]
    );
    logger.info(
      `USER:${userId} tried to register a new ticket. Success. ID:${new_id[0].id}`
    );
    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    logger.info(
      `USER:${userId} tried to register a new ticket. But failed: ${error}`
    );
    return res.status(500).json({
      status: "error",
      message: error,
    });
  }
}

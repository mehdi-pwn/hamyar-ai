import { query } from "@lib/db";
import logger from "@utils/logger";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(400).json({ status: "fail", error: "Invalid request" });

  const token = req.cookies.token;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.AUTH_SECRET);
  } catch (error) {
    return res.status(401).json({ status: "fail", error: "no-auth" });
  }
  const userId = decoded.id;

  switch (req.body.type) {
    case "get-name": {
      try {
        const user = await query(
          `
        SELECT name FROM users WHERE id = ?
        `,
          [userId]
        );

        if (user[0].name) {
          return res.status(200).json({
            status: "success",
            name: user[0].name,
          });
        }
      } catch (error) {
        return res.status(500).json({ status: "fail", error });
      }
      break;
    }
    case "set-name": {
      try {
        const { name } = req.body;
        const user = await query(
          `
        UPDATE users SET name = ? WHERE id = ?
        `,
          [name, userId]
        );

        logger.info(
          `USER:${userId} changed profile settings. NEW_NAME:${name}`
        );

        return res.status(200).json({
          status: "success",
        });
      } catch (error) {
        logger.info(`USER:${userId} tried to change profile settings. Failed.`);
        return res.status(500).json({ status: "fail", error });
      }
      break;
    }
    case "get-ai-model": {
      try {
        const user = await query(
          `
        SELECT ai_id FROM users WHERE id = ?
        `,
          [userId]
        );

        if (user[0].ai_id) {
          return res.status(200).json({
            status: "success",
            id: user[0].ai_id,
          });
        } else {
          return res.status(200).json({
            status: "success",
            id: 1,
          });
        }
      } catch (error) {
        return res.status(500).json({ status: "fail", error });
      }
      break;
    }
    case "set-ai-model": {
      try {
        const { ai_id } = req.body;
        const userPlan = await query(
          `
        SELECT plan FROM users WHERE id = ?
        `,
          [userId]
        );

        if (userPlan[0].plan != 2) {
          return res.status(200).json({
            status: "fail",
            error: "plan",
          });
        }

        const user = await query(
          `
        UPDATE users SET ai_id = ? WHERE id = ?
        `,
          [ai_id, userId]
        );

        logger.info(
          `USER:${userId} changed profile settings. NEW_AI_ID:${ai_id}`
        );

        return res.status(200).json({
          status: "success",
        });
      } catch (error) {
        logger.info(`USER:${userId} tried to change profile settings. Failed.`);
        return res.status(500).json({ status: "fail", error });
      }
      break;
    }
    default:
      break;
  }
}

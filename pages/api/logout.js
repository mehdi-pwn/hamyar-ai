import logger from "@utils/logger";

export default async function handler(req, res) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      "token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    logger.info(`USER:${"todo_id"} just logged out`);
    res.status(200).json({ status: "success" });
  } else {
    logger.info(`USER: ${"todo_id"} failed to logout.`);
    return res.status(500).json({
      status: "failed",
      error: "Invalid Request",
    });
  }
}

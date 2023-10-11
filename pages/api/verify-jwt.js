import jwt from "jsonwebtoken";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    res.status(200).json({ status: "success", decoded });
  } catch (error) {
    res.status(200).json({ status: "failed", error: "Invalid token" });
  }
}

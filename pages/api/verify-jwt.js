//import jwt from "jsonwebtoken";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  res.status(200).json({ status: "failed", error: "Invalid token" });
  // const token = req.cookies.token;

  // try {
  //   const decoded = jwt.verify(token, process.env.AUTH_SECRET);
  //   res.status(200).json({ status: "success", decoded });
  // } catch (error) {
  //   res.status(200).json({ status: "failed", error: "Invalid token" });
  // }
}

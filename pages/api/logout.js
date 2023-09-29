export default async function handler(req, res) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      "token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    res.status(200).json({ status: "success" }).end();
  } else {
    return res.status(500).json({
      status: "failed",
      error: "Invalid Request",
    });
  }
}

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      res.setHeader(
        "Set-Cookie",
        `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`
      );

      res
        .status(200)
        .json({ error: false, message: "Logged out successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: "Failed to log out" });
    }
  } else {
    res.status(405).json({ error: true, message: "Invalid request method" });
  }
}

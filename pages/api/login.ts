import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/server/Migration/connectToDatabase";
import User from "@/server/Migration/Models/User";

const EXPIRES_IN = 60 * 60;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await User.login({ email, password });

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: EXPIRES_IN,
        }
      );

      res.setHeader(
        "Set-Cookie",
        `token=${token}; path=/; expires=${new Date(
          Date.now() + EXPIRES_IN * 1000
        ).toUTCString()}; HttpOnly; Secure`
      );

      res.status(200).json({ error: false, message: "Logged in successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true, message: "Authentication failed" });
    }
  } else {
    res.status(405).json({ error: true, message: "Invalid request method" });
  }
}

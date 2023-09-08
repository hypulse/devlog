import User from "@/server/Models/User";
import connectToDatabase from "@/server/connectToDatabase";
import { NextApiRequest, NextApiResponse } from "next";

const ALLOWED_EMAIL = "sjinsilval28@naver.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (email !== ALLOWED_EMAIL) {
        throw new Error("Invalid email address");
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const user = new User({ email, password });
      await user.save();

      res
        .status(201)
        .json({ error: false, message: "Registration successful" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true, message: "Registration failed" });
    }
  } else {
    res.status(405).json({ error: true, message: "Method not allowed." });
  }
}

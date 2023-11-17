import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/server/Migration/connectToDatabase";
import User from "@/server/Migration/Models/User";
import redisClient from "@/server/Migration/redis";

const EXPIRES_IN = 60 * 60;

const REDIS_EXPIRES_IN = 60 * 60 * 24;
const MAX_LOGIN_ATTEMPTS = 5;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { email } = req.body;

    const failCount = await redisClient.get(`login-fail-${email}`);
    if (failCount && parseInt(failCount) >= MAX_LOGIN_ATTEMPTS) {
      res.status(400).json({
        error: true,
        message: "Too many login attempts, please try again later",
      });
      return;
    }

    try {
      const { email, password } = req.body;
      const { error, code, data: user } = await User.login({ email, password });

      if (code === 401) {
        const failCount = await redisClient.incr(`login-fail:${email}`);
        redisClient.expire(`login-fail:${email}`, REDIS_EXPIRES_IN);

        console.log(`login-fail:${email}`, failCount);
      }

      if (error) {
        throw new Error("Authentication failed");
      } else {
        await redisClient.del(`login-fail:${email}`);
      }

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

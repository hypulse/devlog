import Post from "@/server/Migration/Models/Post";
import connectToDatabase from "@/server/Migration/connectToDatabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (ip !== "127.0.0.1") {
    res.status(401).json({ error: true, message: "Unauthorized" });
    return;
  }

  switch (req.method) {
    case "GET":
      try {
        const articles = await Post.findAll({
          where: {
            state: "active",
          },
        });
        const snippets = await Post.findAll({
          where: {
            state: "snippet",
          },
        });
        res.status(200).json({
          error: false,
          data: {
            articles: articles,
            snippets: snippets,
          },
        });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ error: true, message: "Failed to retrieve posts" });
      }
      break;

    default:
      res.status(405).json({ error: true, message: "Invalid request method" });
      break;
  }
}

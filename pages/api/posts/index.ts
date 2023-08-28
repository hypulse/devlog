import Post from "@/server/Models/Post";
import connectToDatabase from "@/server/connectToDatabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  let { page = 1, limit = 10, state = "active" } = req.query;
  limit = Math.min(Number(limit), 50);

  switch (req.method) {
    case "GET":
      try {
        const skipValue = (Number(page) - 1) * Number(limit);
        const queryOptions = {
          state: state as string,
        };

        let query = Post.find(queryOptions)
          .skip(skipValue)
          .limit(Number(limit));

        if (state !== "snippet") {
          query = query.select("-content");
        }

        const posts = await query.exec();

        res.status(200).json({ error: false, data: posts });
      } catch (error) {
        res
          .status(400)
          .json({ error: true, message: "Failed to retrieve posts" });
      }
      break;

    case "POST":
      try {
        const post = await Post.create(req.body);
        res.status(201).json({ error: false, data: post });
      } catch (error) {
        res.status(400).json({ error: true, message: "Failed to create post" });
      }
      break;

    default:
      res.status(400).json({ error: true, message: "Invalid request method" });
      break;
  }
}

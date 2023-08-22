import Post from "@/server/Models/Post";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = 1, limit = 10, state = "active" } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const posts = await Post.find({ state: state as string })
          .select("-content")
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit));

        if (!posts.length) {
          return res
            .status(404)
            .json({ error: true, message: "No posts found" });
        }
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

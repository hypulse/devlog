import Post from "@/server/Models/Post";
import connectToDatabase from "@/server/connectToDatabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const post = await Post.findById(id);
        if (!post) {
          return res
            .status(404)
            .json({ error: true, message: "Post not found" });
        }
        res.status(200).json({ error: false, data: post });
      } catch (error) {
        res
          .status(400)
          .json({ error: true, message: "Failed to retrieve post" });
      }
      break;

    case "PATCH":
      try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!post) {
          return res
            .status(404)
            .json({ error: true, message: "Post not found" });
        }
        res.status(200).json({ error: false, data: post });
      } catch (error) {
        res.status(400).json({ error: true, message: "Failed to update post" });
      }
      break;

    case "DELETE":
      try {
        const deletedPost = await Post.deleteOne({ _id: id });
        if (!deletedPost) {
          return res
            .status(404)
            .json({ error: true, message: "Post not found" });
        }
        res.status(200).json({ error: false, data: {} });
      } catch (error) {
        res.status(400).json({ error: true, message: "Failed to delete post" });
      }
      break;

    default:
      res.status(400).json({ error: true, message: "Invalid request method" });
      break;
  }
}

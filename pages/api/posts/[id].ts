import Post from "@/server/Migration/Models/Post";
import connectToDatabase from "@/server/Migration/connectToDatabase";
import verifyUser from "@/server/verifyUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const token = req.cookies.token;

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const post: any = await Post.findByPk(id as string);

        if (!post) {
          return res
            .status(404)
            .json({ error: true, message: "Post not found" });
        }

        if (["removed", "draft"].includes(post.state)) {
          verifyUser(token);
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
        verifyUser(token);

        const [updateCount] = await Post.update(req.body, {
          where: { id: id },
        });

        if (updateCount === 0) {
          return res
            .status(404)
            .json({ error: true, message: "Post not found" });
        }

        const updatedPost = await Post.findByPk(id as string);

        res.status(200).json({ error: false, data: updatedPost });
      } catch (error) {
        res.status(400).json({ error: true, message: "Failed to update post" });
      }
      break;

    case "DELETE":
      try {
        verifyUser(token);

        const deletedPost = await Post.destroy({ where: { id: id } });

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
      res.status(405).json({ error: true, message: "Invalid request method" });
      break;
  }
}

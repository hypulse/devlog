import Post from "@/server/Migration/Models/Post";
import connectToDatabase from "@/server/Migration/connectToDatabase";
import verifyUser from "@/server/verifyUser";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const token = req.cookies.token;

  let { page = 1, limit = 10, state = "active" } = req.query;
  limit = Math.min(Number(limit), 50);

  switch (req.method) {
    case "GET":
      try {
        if (!["active", "snippet"].includes(state as string)) {
          verifyUser(token);
        }

        const offset = (Number(page) - 1) * Number(limit);
        const where = {
          state: state as string,
        };

        let attributes;
        if (state !== "snippet") {
          attributes = { exclude: ["content"] };
        }

        const posts = await Post.findAll({
          where: where,
          limit: Number(limit),
          offset: offset,
          order: [["updatedAt", "DESC"]],
          attributes: attributes,
        });

        const totalPosts = await Post.count({ where: where });
        const lastPage = Math.ceil(totalPosts / Number(limit));

        res.status(200).json({ error: false, data: { posts, lastPage } });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ error: true, message: "Failed to retrieve posts" });
      }
      break;

    case "POST":
      try {
        verifyUser(token);

        const post = await Post.create(req.body);
        res.status(201).json({ error: false, data: post });
      } catch (error) {
        res.status(400).json({ error: true, message: "Failed to create post" });
      }
      break;

    default:
      res.status(405).json({ error: true, message: "Invalid request method" });
      break;
  }
}

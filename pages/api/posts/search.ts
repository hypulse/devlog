import Post from "@/server/Migration/Models/Post";
import connectToDatabase from "@/server/Migration/connectToDatabase";
import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  let { page = 1, limit = 10, q = "" } = req.query;
  limit = Math.min(Number(limit), 50);

  if ((q as string).length < 2) {
    return res.status(400).json({
      error: true,
      message: "Search query should be at least 2 characters long",
    });
  }

  if (req.method === "GET") {
    try {
      const offset = (Number(page) - 1) * Number(limit);
      const whereCondition = {
        state: { [Op.in]: ["active", "snippet"] },
        content: { [Op.like]: `%${q}%` },
      };

      const posts = await Post.findAll({
        where: whereCondition,
        attributes: { exclude: ["content"] },
        limit: Number(limit),
        offset: offset,
      });

      const totalPosts = await Post.count({ where: whereCondition });
      const lastPage = Math.ceil(totalPosts / Number(limit));

      res.status(200).json({
        error: false,
        data: { posts, lastPage },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: true, message: "Failed to retrieve posts" });
    }
  } else {
    res.status(405).json({ error: true, message: "Invalid request method" });
  }
}

import Post from "@/server/Models/Post";
import connectToDatabase from "@/server/connectToDatabase";
import { NextApiRequest, NextApiResponse } from "next";

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
      const skipValue = (Number(page) - 1) * Number(limit);
      const queryOptions = {
        state: { $in: ["active", "snippet"] },
        content: new RegExp(q as string, "i"),
      };

      const posts = await Post.find(queryOptions)
        .select("-content")
        .skip(skipValue)
        .limit(Number(limit))
        .exec();

      res.status(200).json({ error: false, data: posts });
    } catch (error) {
      res
        .status(500)
        .json({ error: true, message: "Failed to retrieve posts" });
    }
  } else {
    res.status(405).json({ error: true, message: "Invalid request method" });
  }
}

import { PostState } from "@/types";
import { Document, Schema, model, models } from "mongoose";

interface PostDocument extends Document {
  title: string;
  summary: string;
  wordCount: number;
  content: string;
  state: PostState;
}

const postSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    wordCount: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["active", "removed", "draft"],
      default: "draft",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = models.Post || model<PostDocument>("Post", postSchema);

export default Post;

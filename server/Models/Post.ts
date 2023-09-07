import { PostState } from "@/types/post";
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
      required: false,
    },
    wordCount: {
      type: Number,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      enum: ["active", "snippet", "removed", "draft"],
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

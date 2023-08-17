import mongoose, { Schema, Document, Types } from "mongoose";

type ArticleSchema = {
  title: string;
  content?: string;
  description?: string;
  thumbnailImage?: string;
  wordCount?: number;
  tags?: Types.ObjectId[];
  type: "article" | "snippet";
  status: "draft" | "published" | "deleted";
};

export interface IArticle extends Document, ArticleSchema {}

const Article: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    description: { type: String },
    thumbnailImage: { type: String },
    wordCount: { type: Number, default: 0 },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    type: { type: String, enum: ["article", "snippet"], required: true },
    status: {
      type: String,
      enum: ["draft", "published", "deleted"],
      required: true,
    },
  },
  { timestamps: true }
);

const ArticleModel =
  mongoose.models.Article || mongoose.model<IArticle>("Article", Article);
export default ArticleModel;

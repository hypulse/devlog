import mongoose, { Schema, Document } from "mongoose";
import { ArticleSchema } from "@/types/schema";

type IArticle = ArticleSchema & Document;

const Article: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    description: { type: String },
    thumbnailImage: { type: String },
    wordCount: { type: Number, required: true },
    tags: { type: [Schema.Types.Mixed] },
    type: { type: String, enum: ["article", "snippet"], required: true },
    status: {
      type: String,
      enum: ["draft", "published", "deleted"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const ArticleModel =
  mongoose.models.Article || mongoose.model<IArticle>("Article", Article);
export default ArticleModel;

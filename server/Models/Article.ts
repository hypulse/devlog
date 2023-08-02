import mongoose, { Schema, Document } from "mongoose";
import { ArticleSchema } from "@/types/schema";

type IArticle = ArticleSchema & Document;

const ArticleModel: Schema = new Schema(
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

const Article =
  mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleModel);
export default Article;

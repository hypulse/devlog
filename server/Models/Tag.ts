import { TagSchema } from "@/types/schema";
import mongoose, { Document, Schema } from "mongoose";

type ITag = TagSchema & Document;

const TagModel: Schema = new Schema({
  name: { type: String, required: true },
});

const Tag = mongoose.models.Tag || mongoose.model<ITag>("Tag", TagModel);
export default Tag;

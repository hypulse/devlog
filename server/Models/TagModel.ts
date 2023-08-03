import { TagSchema } from "@/types/schema";
import mongoose, { Document, Schema } from "mongoose";

type ITag = TagSchema & Document;

const Tag: Schema = new Schema({
  name: { type: String, required: true },
});

const TagModel = mongoose.models.Tag || mongoose.model<ITag>("Tag", Tag);
export default TagModel;

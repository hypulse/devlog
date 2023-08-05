import mongoose, { Document, Schema } from "mongoose";

type TagSchema = {
  name: string;
};

export interface ITag extends Document, TagSchema {}

const Tag: Schema = new Schema({
  name: { type: String, required: true },
});

const TagModel = mongoose.models.Tag || mongoose.model<ITag>("Tag", Tag);
export default TagModel;

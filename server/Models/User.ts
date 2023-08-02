import { UserSchema } from "@/types/schema";
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

type IUser = UserSchema & Document;

const UserModel: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserModel.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

UserModel.statics.login = async function ({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");
  return user;
};

const User = mongoose.models.User || mongoose.model<IUser>("User", UserModel);
export default User;

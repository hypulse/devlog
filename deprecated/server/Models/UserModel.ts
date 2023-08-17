import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

type UserSchema = {
  email: string;
  password: string;
};

export interface IUser extends Document, UserSchema {
  login: (payload: {
    email: string;
    password: string;
  }) => Promise<IUser & { _id: string }>;
}

const User: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

User.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

User.statics.login = async function ({
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

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", User);
export default UserModel;

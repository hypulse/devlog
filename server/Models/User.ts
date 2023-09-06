import {
  CallbackError,
  Document,
  Model,
  Schema,
  model,
  models,
} from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

interface IUserModel extends Model<UserDocument> {
  login({ email, password }: LoginParams): Promise<UserDocument>;
}

interface UserDocument extends Document {
  email: string;
  password: string;
}

type LoginParams = {
  email: string;
  password: string;
};

const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.statics.login = async function ({ email, password }: LoginParams) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("No user associated with this email address.");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Incorrect password.");

  return user;
};

const User =
  (models.User as IUserModel) ||
  model<UserDocument, IUserModel>("User", userSchema);

export default User;

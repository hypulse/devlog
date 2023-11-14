import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../sequelize";

const SALT_ROUNDS = 10;

class User extends Model {
  static async login({ email, password }: { email: string; password: string }) {
    const user: any = await User.findOne({ where: { email } });
    if (!user) throw new Error("No user associated with this email address.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Incorrect password.");

    return user;
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "User",
    hooks: {
      beforeSave: async (user: any) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(SALT_ROUNDS);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;

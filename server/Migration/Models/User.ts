import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../sequelize";

const SALT_ROUNDS = 10;

class User extends Model {
  static async login({ email, password }: { email: string; password: string }) {
    const user: any = await User.findOne({ where: { email } });
    if (!user) return { error: true, code: 404 };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { error: true, code: 401 };

    return {
      data: user,
      error: false,
    };
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
    timestamps: false,
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

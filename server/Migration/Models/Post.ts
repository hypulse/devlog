import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

enum PostState {
  ACTIVE = "active",
  SNIPPET = "snippet",
  REMOVED = "removed",
  DRAFT = "draft",
}

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wordCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    state: {
      type: DataTypes.ENUM,
      values: Object.values(PostState),
      defaultValue: PostState.DRAFT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Post",
    timestamps: true,
  }
);

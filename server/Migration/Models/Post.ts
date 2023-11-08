import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize";

export enum PostState {
  Active = "active",
  Snippet = "snippet",
  Removed = "removed",
  Draft = "draft",
}

class Post extends Model {
  public id!: number;
  public title!: string;
  public summary?: string;
  public wordCount?: number;
  public content?: string;
  public state!: PostState;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
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
      defaultValue: PostState.Draft,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Post",
    timestamps: true,
  }
);

Post.sync();

export default Post;

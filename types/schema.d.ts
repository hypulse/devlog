type UserSchema = {
  email: string;
  password: string;
};

type TagSchema = {
  _id: string;
  name: string;
};

type ArticleSchema = {
  _id: string;
  title: string;
  content?: string;
  description?: string;
  thumbnailImage?: string;
  wordCount: number;
  createdAt: Date;
  updatedAt?: Date;
  tags?: Array<TagSchema>;
  type: "article" | "snippet";
  status?: "draft" | "published" | "deleted";
};

export type { UserSchema, TagSchema, ArticleSchema };

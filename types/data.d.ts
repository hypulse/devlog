export type TagData = {
  _id: string;
  name: string;
};

export type ArticleData = {
  _id: string;
  title: string;
  content?: string;
  description?: string;
  thumbnailImage?: string;
  wordCount: number;
  createdAt: string;
  updatedAt?: string;
  tags?: Array<TagData>;
  type: "article" | "snippet";
  status?: "draft" | "published" | "deleted";
};

export type CardData = Omit<ArticleData, "content" | "tags">;

export type PostState = "active" | "removed" | "draft";

export type PostType = {
  _id: string;
  title: string;
  summary: string;
  wordCount: number;
  content: string;
  state: PostState;
  createdAt: Date;
  updatedAt: Date;
};

export type PostState = "active" | "removed" | "draft";

export type PostTypeGet = {
  _id: string;
  title: string;
  summary?: string;
  wordCount?: number;
  content?: string;
  state: PostState;
  createdAt: Date;
  updatedAt: Date;
};

export type PostTypePost = {
  title: string;
  summary?: string;
  wordCount?: number;
  content?: string;
  state?: PostState;
};
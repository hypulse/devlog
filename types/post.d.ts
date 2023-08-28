export type PostState = "active" | "snippet" | "removed" | "draft";

export type PostTypeGet = {
  _id: string;
  title: string;
  summary?: string;
  wordCount?: number;
  content?: string;
  state: PostState;
  createdAt: string;
  updatedAt: string;
};

export type PostTypePost = {
  title: string;
  summary?: string;
  wordCount?: number;
  content?: string;
  state?: PostState;
};

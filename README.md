```ts
// Tag Schema
type Tag = {
  _id: string;
  name: string;
};

// 본문용 원본 Article Schema
type Article = {
  _id: string;
  title: string;
  content: string;
  description: string;
  wordCount: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  thumbnail: string;
  type: "article" | "snippet";
};

// User Schema
type User = {
  email: string;
  password: string;
};

// Snippet용 필드
type Snippet = {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: "snippet";
};

// Article Card용 필드
type ArticleSummary = {
  _id: string;
  title: string;
  description: string;
  wordCount: number;
  createdAt: Date;
  thumbnail: string;
  type: "article";
};
```

import type { ArticleSchema } from "./schema";

type ArticleData = ArticleSchema & {
  type: "article";
};

type SnippetData = ArticleSchema & {
  type: "snippet";
};

type CardData = Omit<ArticleSchema, "content" | "tags">;

export type { ArticleData, SnippetData, CardData };

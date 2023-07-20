import type { ArticleSchema } from "./schema";

type SnippetData = Omit<
  ArticleSchema,
  "description" | "thumbnailImage" | "wordCount" | "tags"
> & {
  type: "snippet";
};

type ArticleCardData = Omit<ArticleSchema, "content"> & {
  type: "article";
};

export type { SnippetData, ArticleCardData };

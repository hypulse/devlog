import type { ArticleSchema } from "./schema";

type CardData = Omit<ArticleSchema, "content" | "tags">;

export type { CardData };

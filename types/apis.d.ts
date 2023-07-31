import { CardData } from "./data";
import { ArticleSchema } from "./schema";

type GetCards = ({
  page,
  limit,
  admin,
  type,
  status,
}: {
  page?: number;
  limit?: number;
  admin?: boolean;
  type?: "article" | "snippet";
  status?: "draft" | "published" | "deleted";
}) => Promise<Array<CardData & { maxIndex: number }>>;

type GetArticle = ({
  _id,
  admin,
}: {
  id: string;
  admin?: boolean;
}) => Promise<ArticleSchema>;

type GetPrevAndNext = ({ _id }) => Promise<{
  prev: ArticleSchema | null;
  next: ArticleSchema | null;
}>;

type SearchArticles = (
  query: { q: string } | { tag: string }
) => Promise<Array<ArticleSchema>>;

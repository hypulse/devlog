import { CardData } from "./data";
import { ArticleSchema } from "./schema";

type IdList = Array<string>;

type DefaultResponse = {
  success: true | string;
};

type HandleError = ({ success }: DefaultResponse) => void;

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
}) => Promise<
  Array<
    CardData & {
      maxIndex: number;
      page: number;
      limit: number;
    } & DefaultResponse
  >
>;

type GetArticle = ({
  _id,
  admin,
}: {
  id: string;
  admin?: boolean;
}) => Promise<ArticleSchema & DefaultResponse>;

type GetPrevAndNext = (_id: string) => Promise<
  {
    prev: ArticleSchema | null;
    next: ArticleSchema | null;
  } & DefaultResponse
>;

type SearchArticles = (
  query: { q: string } | { tag: string }
) => Promise<Array<ArticleSchema> & DefaultResponse>;

type Login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Promise<DefaultResponse>;

type Logout = () => Promise<DefaultResponse>;

type CreateArticle = (payload: {
  title: string;
  content?: string;
  description?: string;
  thumbnailImage?: string;
  wordCount: number;
  tags?: IdList;
  type: "article" | "snippet";
  status: "draft" | "published" | "deleted";
}) => Promise<DefaultResponse>;

type UpdateArticle = (payload: {
  _id: string;
  title?: string;
  content?: string;
  description?: string;
  thumbnailImage?: string;
  wordCount?: number;
  tags?: IdList;
  type?: "article" | "snippet";
  status?: "draft" | "published" | "deleted";
}) => Promise<DefaultResponse>;

type DeleteArticle = (payload: IdList) => Promise<DefaultResponse>;

type CreateTag = (payload: IdList) => Promise<DefaultResponse>;

type UpdateTag = (payload: {
  _id: string;
  name: string;
}) => Promise<DefaultResponse>;

type DeleteTag = (payload: IdList) => Promise<DefaultResponse>;

import { CardData } from "./data";
import { ArticleSchema } from "./schema";

type IdList = Array<string>;

type DefaultResponse = {
  success: boolean;
  message?: string;
};

type HandleAuth = () => void | never;

// USER
type Login = (payload: {
  email: string;
  password: string;
}) => Promise<DefaultResponse>;

type Logout = () => Promise<DefaultResponse>;

type Register = (payload: {
  email: string;
  password: string;
}) => Promise<DefaultResponse>;

// ARTICLE
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

type DeleteArticles = (payload: IdList) => Promise<DefaultResponse>;

type GetArticles = (payload: {
  query: { q: string } | { tag: IdList };
  page?: number;
  limit?: number;
  admin?: boolean;
  card?: boolean;
  type?: "article" | "snippet";
  status?: "draft" | "published" | "deleted";
}) => Promise<
  Array<
    (ArticleSchema | CardData) & {
      maxIndex: number;
      page: number;
      limit: number;
    } & DefaultResponse
  >
>;

// TAG
type CreateTags = (payload: IdList) => Promise<DefaultResponse>;

type ReadTags = () => Promise<DefaultResponse>;

type UpdateTag = (payload: {
  _id: string;
  name: string;
}) => Promise<DefaultResponse>;

type DeleteTag = (payload: IdList) => Promise<DefaultResponse>;

export type {
  HandleAuth,
  Login,
  Logout,
  Register,
  CreateArticle,
  UpdateArticle,
  DeleteArticles,
  GetArticles,
  CreateTags,
  ReadTags,
  UpdateTag,
  DeleteTag,
};

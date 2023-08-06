import { Types } from "mongoose";
import { ArticleData, CardData } from "./data";

type IdList = Types.ObjectId[];

type DefaultResponse = {
  success: boolean;
  message?: string;
};

type QueryType = { q: string } | { tag: string };

export type CreateArticlePayload = {
  title: string;
  content?: string;
  description?: string;
  thumbnailImage?: string;
  wordCount?: number;
  tags?: IdList;
  type: "article" | "snippet";
  status: "draft" | "published" | "deleted";
};

// ARTICLE
type CreateArticle = (
  payload: CreateArticlePayload
) => Promise<DefaultResponse>;

type UpdateArticle = (
  payload: CreateArticlePayload & { _id: string }
) => Promise<DefaultResponse>;

type DeleteArticles = (payload: IdList) => Promise<DefaultResponse>;

type GetArticles = (payload: {
  page?: number;
  limit?: number;
  type?: "article" | "snippet";
  status?: "draft" | "published" | "deleted";
  query?: QueryType;
  auth?: boolean;
  card?: boolean;
}) => Promise<
  | Array<
      (ArticleData | CardData) & {
        maxIndex: number;
        page: number;
        limit: number;
      } & DefaultResponse
    >
  | DefaultResponse
>;

// TAG
type CreateTags = (payload: IdList) => Promise<DefaultResponse>;

type ReadTags = () => Promise<DefaultResponse>;

type UpdateTag = (payload: {
  _id: string;
  name: string;
}) => Promise<DefaultResponse>;

type DeleteTag = (payload: IdList) => Promise<DefaultResponse>;

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

export type {
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

import {
  CreateArticle,
  DeleteArticles,
  GetArticles,
  UpdateArticle,
} from "@/types/apis";
import ArticleModel, { IArticle } from "../Models/ArticleModel";
import catchErrorObject from "@/utils/server/catchErrorObject";
import { ArticleData, CardData } from "@/types/data";

export const createArticle: CreateArticle = async (payload) => {
  try {
    const article = new ArticleModel(payload);
    await article.save();
    return { success: true };
  } catch (error) {
    return catchErrorObject(error);
  }
};

export const updateArticle: UpdateArticle = async (payload) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(payload._id, payload, {
      new: true,
    });
    if (!article) {
      return { success: false, message: "Article not found" };
    }
    return { success: true };
  } catch (error) {
    return catchErrorObject(error);
  }
};

export const deleteArticles: DeleteArticles = async (payload) => {
  try {
    await ArticleModel.deleteMany({ _id: { $in: payload } });
    return { success: true };
  } catch (error) {
    return catchErrorObject(error);
  }
};

export const getArticles: GetArticles = async (payload) => {
  try {
    let query = {};

    if (payload.query) {
      if ("q" in payload.query) {
        query = { title: { $regex: payload.query.q, $options: "i" } };
      } else if ("tag" in payload.query) {
        query = { tags: payload.query.tag };
      }
    }

    if (payload.type) {
      query = { ...query, type: payload.type };
    }

    if (payload.status && payload.auth) {
      query = { ...query, status: payload.status };
    } else {
      query = { ...query, status: "published" };
    }

    let articles: Array<IArticle>;

    if (payload.card) {
      articles = await ArticleModel.find(query)
        .select("-content -tags")
        .limit(payload.limit || 10)
        .skip((payload.page || 0) * (payload.limit || 10));
    } else {
      articles = (await ArticleModel.find(query)
        .populate("tags")
        .limit(payload.limit || 10)
        .skip((payload.page || 0) * (payload.limit || 10))) as Array<IArticle>;
    }

    const maxIndex = await ArticleModel.countDocuments(query);

    return articles.map((article) => {
      const articleData: ArticleData | CardData = {
        ...article.toObject(),
      };

      return {
        ...articleData,
        maxIndex,
        page: payload.page || 0,
        limit: payload.limit || 10,
        success: true,
      };
    });
  } catch (error) {
    return catchErrorObject(error);
  }
};

export const getArticlesUnauth = (payload: any) => {
  return getArticles({ ...payload, auth: false });
};

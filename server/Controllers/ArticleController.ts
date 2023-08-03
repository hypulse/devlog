import {
  CreateArticle,
  DeleteArticles,
  GetArticles,
  UpdateArticle,
} from "@/types/apis";
import ArticleModel from "../Models/ArticleModel";
import handleError from "@/utils/server/handleError";

const Article = ArticleModel;

export const createArticle: CreateArticle = async (payload) => {
  try {
    const article = new Article(payload);
    await article.save();
    return { success: true };
  } catch (error) {
    return handleError(error);
  }
};

export const updateArticle: UpdateArticle = async (payload) => {
  try {
    const article = await Article.findByIdAndUpdate(payload._id, payload, {
      new: true,
    });
    if (!article) {
      return { success: false, message: "Article not found" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteArticles: DeleteArticles = async (payload) => {
  try {
    await Article.deleteMany({ _id: { $in: payload } });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getArticles: GetArticles = async (payload) => {
  try {
    let query = {};
    if (payload.query.q) {
      query = { title: { $regex: payload.query.q, $options: "i" } };
    } else if (payload.query.tag) {
      query = { tags: { $in: payload.query.tag } };
    }

    if (payload.type) {
      query = { ...query, type: payload.type };
    }

    if (payload.status) {
      query = { ...query, status: payload.status };
    }

    const limit = payload.limit || 10;
    const page = payload.page || 1;
    const articles = await Article.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Article.countDocuments(query);
    const maxIndex = Math.ceil(total / limit);

    return articles.map((article) => ({
      ...article.toJSON(),
      maxIndex,
      page,
      limit,
      success: true,
    }));
  } catch (error) {
    return [{ success: false, message: error.message }];
  }
};

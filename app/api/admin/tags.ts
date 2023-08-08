import {
  createArticle,
  deleteArticles,
  getArticles,
  updateArticle,
} from "@/server/Controllers/ArticleController";
import handlerWithMethods from "@/utils/server/handlerWithMethods";

export default handlerWithMethods({
  POST: {
    controller: createArticle,
    auth: true,
  },
  GET: {
    controller: getArticles,
    auth: true,
  },
  UPDATE: {
    controller: updateArticle,
    auth: true,
  },
  DELETE: {
    controller: deleteArticles,
    auth: true,
  },
});

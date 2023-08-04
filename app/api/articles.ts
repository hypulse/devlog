import { createArticle } from "@/server/Controllers/ArticleController";
import handlerWithMethods from "@/utils/server/handlerWithMethods";

export default handlerWithMethods({
  POST: createArticle,
});

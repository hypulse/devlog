import { getArticlesUnauth } from "@/server/Controllers/ArticleController";
import handlerWithMethods from "@/utils/server/handlerWithMethods";

export default handlerWithMethods({
  GET: {
    controller: getArticlesUnauth,
  },
});

import hljs from "highlight.js";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";

const baseMarked = marked;

const options: marked.MarkedOptions = {
  gfm: false,
};

baseMarked.use(
  markedHighlight({
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  mangle(),
  gfmHeadingId(),
  options
);

export default baseMarked;

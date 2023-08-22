import { MarkedOptions, marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import hljs from "highlight.js";

const options: MarkedOptions = {
  gfm: false,
};

marked.setOptions(options);

marked.use(
  markedHighlight({
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  mangle(),
  gfmHeadingId()
);

const baseMarked = marked;
export default baseMarked;

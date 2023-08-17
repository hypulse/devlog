import { mergeClasses } from "@/utils";
import hljs from "highlight.js";
import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { mangle } from "marked-mangle";
import { HTMLAttributes } from "react";

interface MarkedProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

const markedOptions: marked.MarkedOptions = {
  async: false,
  breaks: false,
  gfm: true,
  pedantic: false,
  silent: false,
};

marked.use(
  markedOptions,
  markedHighlight({
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  mangle(),
  gfmHeadingId()
);

const Marked = ({ text, className, ...props }: MarkedProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: marked.parse(text) }}
      className={mergeClasses(className, "markdown-body")}
      {...props}
    />
  );
};

export default Marked;

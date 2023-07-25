import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { HTMLAttributes } from "react";
import hljs from "highlight.js";
import "./../styles/main.scss";
import "./../styles/markdown.css";

interface MarkedProps extends HTMLAttributes<HTMLDivElement> {
  content?: string;
  className?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

marked.setOptions({});

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

const Marked = ({
  content,
  className,
  dangerouslySetInnerHTML,
  ...props
}: MarkedProps) => {
  return (
    <div
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: marked.parse(content || "") }}
      {...props}
    />
  );
};

export default Marked;

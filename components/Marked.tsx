import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { HTMLAttributes, useEffect } from "react";
import useTheme from "@/utils/app/hooks/useTheme";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import "github-markdown-css/github-markdown-light.css";

interface MarkedProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  className?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
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
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      import("highlight.js/styles/atom-one-dark.css");
      import("github-markdown-css/github-markdown-dark.css");
    }
  }, [theme]);

  return (
    <div
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
      {...props}
    />
  );
};

export default Marked;

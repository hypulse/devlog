import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { HTMLAttributes, useEffect } from "react";
import hljs from "highlight.js";
import "./../styles/highlight.scss";
import "./../styles/markdown.css";
import "./../styles/code-block.css";
import { copyToClipboard } from "@/utils/app";

interface MarkedProps extends HTMLAttributes<HTMLDivElement> {
  content?: string;
  className?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

const renderer: marked.RendererObject = {
  code(code: string, language: string) {
    return `<div class="code-block">
    <button class="copy-button">Copy</button>
    <div class="language">${language}</div>
    <pre><code class="language-${language}">${code}</code></pre>
  </div>`;
  },
};

marked.use(
  {
    gfm: true,
    breaks: true,
  },
  markedHighlight({
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  mangle(),
  gfmHeadingId(),
  { renderer }
);

const Marked = ({
  content,
  className,
  dangerouslySetInnerHTML,
  ...props
}: MarkedProps) => {
  useEffect(() => {
    const copyButtons = document.querySelectorAll(
      ".markdown-body .code-block .copy-button"
    );
    copyButtons.forEach((copyButton) => {
      copyButton.addEventListener("click", () => {
        const codeBlock = copyButton.parentElement;
        const code = codeBlock?.querySelector("code");
        if (code) {
          copyToClipboard(code.innerText);
        }
      });
    });
  }, []);

  return (
    <div
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: marked.parse(content || "") }}
      {...props}
    />
  );
};

export default Marked;

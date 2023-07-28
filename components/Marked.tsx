import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { HTMLAttributes, useEffect } from "react";
import hljs from "highlight.js";
import { copyToClipboard } from "@/utils/app/interactiveFeatures";
import "./../styles/highlight.scss";
import "./../styles/markdown.scss";

interface MarkedProps extends HTMLAttributes<HTMLDivElement> {
  content?: string;
  className?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

const markedOptions: marked.MarkedOptions = {
  async: false,
  breaks: false,
  gfm: true,
  pedantic: false,
  silent: false,
};

const markedRenderer: marked.RendererObject = {
  code(code: string, language: string) {
    return `<pre><code class="hljs language-${language}">${code}</code></pre>`;
  },
  codespan(code) {
    return `<code class="hljs">${code}</code>`;
  },
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
  gfmHeadingId(),
  { renderer: markedRenderer }
);

const Marked = ({
  content,
  className,
  dangerouslySetInnerHTML,
  ...props
}: MarkedProps) => {
  useEffect(() => {
    const copyButtons = document.querySelectorAll<HTMLButtonElement>(
      ".markdown-body .code-block .copy-button"
    );

    const handleCopy = (event: MouseEvent) => {
      const copyButton = event.currentTarget as HTMLButtonElement;
      const codeBlock = copyButton.parentElement;
      const code = codeBlock?.querySelector("code");
      if (code) {
        copyToClipboard(code.innerText);
      }
    };

    copyButtons.forEach((copyButton) => {
      copyButton.addEventListener("click", handleCopy);
    });

    return () => {
      copyButtons.forEach((copyButton) => {
        copyButton.removeEventListener("click", handleCopy);
      });
    };
  }, []);

  return (
    <div
      className={
        className ? ["markdown-body", className].join(" ") : "markdown-body"
      }
      dangerouslySetInnerHTML={{ __html: marked.parse(content || "") }}
      {...props}
    />
  );
};

export default Marked;

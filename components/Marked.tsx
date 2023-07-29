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
  _id?: string;
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
  code(code: string, language: string = "plaintext") {
    return `<div class="code-block">
    <div class="code-block-language">${language}</div>
    <button class="copy-button"><span class="copy-button-icon"></span>Copy</button>
    <pre><code class="hljs language-${language}">${code}</code></pre>
    </div>`;
  },
  heading(text: string, level: number) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
    return `<h${level} id="${escapedText}"><a href="#${escapedText}" class="anchor">#</a> <span>${text}</span></h${level}>`;
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
  _id,
  content,
  className,
  dangerouslySetInnerHTML,
  ...props
}: MarkedProps) => {
  useEffect(() => {
    const headings = document.querySelectorAll<HTMLHeadingElement>(
      ".markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6"
    );

    if (_id) {
      headings.forEach((heading) => {
        const anchor = heading.querySelector<HTMLAnchorElement>(".anchor");
        const span = heading.querySelector<HTMLSpanElement>("span");
        if (anchor) {
          const escapedText =
            _id + "-" + span?.innerText.toLowerCase().replace(/[^\w]+/g, "-");
          heading.id = escapedText;
          anchor.href = `#${escapedText}`;
        }
      });
    }

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

import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { HTMLAttributes, useEffect } from "react";
import hljs from "highlight.js";
import { copyToClipboard } from "@/utils/app/interactiveFeatures";
import "./../styles/highlight.scss";
import "./../styles/markdown.scss";
import useSnackBar from "@/utils/app/hooks/useSnackbar";
import conditionalClassName from "@/utils/app/conditionalClassName";

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
    if (level === 1)
      return `<h${level} id="${escapedText}"><span>${text}</span></h${level}>`;
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
  onClick,
  ...props
}: MarkedProps) => {
  const { showSnackBar } = useSnackBar();

  const handleCopy = async (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const copyButton = target.closest(".copy-button") as HTMLButtonElement;
    if (copyButton) {
      const codeBlock = copyButton.parentElement;
      const code = codeBlock?.querySelector("code");
      if (code) {
        try {
          await copyToClipboard(code.innerText);
          showSnackBar("Copied code to clipboard", "success");
        } catch (err) {
          showSnackBar("Failed to copy to clipboard", "error");
          console.error(err);
        }
      }
    }
  };

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
  }, [_id]);

  return (
    <div
      className={conditionalClassName("markdown-body", className)}
      dangerouslySetInnerHTML={{ __html: marked.parse(content || "") }}
      onClick={handleCopy}
      {...props}
    />
  );
};

export default Marked;
export { marked };

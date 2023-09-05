import { HTMLAttributes } from "react";
import { marked } from "marked";
import { useEffect, useRef } from "react";
import copyToClipboard from "@/utils/copyToClipboard";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";

interface MarkedProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

marked.setOptions({
  gfm: true,
});

marked.use(
  mangle(),
  gfmHeadingId(),
  markedHighlight({
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  {
    renderer: {
      code(code, lang) {
        lang = lang || "plaintext";
        return `<div class="code-block group">
      <div class="code-block-lang">${lang}</div>
      <button class="code-block-copy group-hover:opacity-100"></button>
      <pre>
        <code class="hljs language-${lang}">{code}</code>
      </pre>
    </div>`
          .replace(/\s+</g, "<")
          .replace(/>[\s\n]+</g, "><")
          .trim()
          .replace("{code}", code);
      },
      codespan(code) {
        return `<code class="hljs">${code}</code>`;
      },
    },
  }
);

const Marked = ({ text, ...props }: MarkedProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastClickedButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleCopyClick = (e: Event) => {
      const target = e.target as HTMLButtonElement;

      if (!target.classList.contains("code-block-copy")) return;

      lastClickedButtonRef.current = target;

      const codeBlock = target.nextElementSibling as HTMLPreElement;

      if (codeBlock) {
        const code = codeBlock.innerText;
        copyToClipboard(code);

        if (lastClickedButtonRef.current) {
          lastClickedButtonRef.current.focus();
        }
      }
    };

    containerRef.current.addEventListener("click", handleCopyClick);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("click", handleCopyClick);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: marked(text) }}
      {...props}
    />
  );
};

export default Marked;

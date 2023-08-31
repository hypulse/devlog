import { HTMLAttributes } from "react";
import { RendererObject } from "marked";
import mergeClasses from "@/utils/mergeClasses";
import baseMarked from "@/utils/baseMarked";

interface MarkedProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

const renderer: RendererObject = {
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
};

baseMarked.use({
  renderer,
});

const Marked = ({ text, ...props }: MarkedProps) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: baseMarked(text) }} {...props} />
  );
};

export default Marked;

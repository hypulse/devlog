import { mergeClasses } from "@/utils";
import marked from "./../utils/baseMarked";
import { HTMLAttributes } from "react";
import "./../styles/markdown-body.scss";

interface MarkedProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

const renderer: marked.RendererObject = {
  code(code, lang) {
    lang = lang || "plaintext";
    return `<div class="code-block">
    <div class="code-block-lang">${lang}</div>
    <button class="code-block-copy">Copy</button>
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

marked.setOptions({
  renderer: renderer as marked.Renderer,
});

const Marked = ({ text, className, ...props }: MarkedProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: marked(text) }}
      className={mergeClasses(className, "markdown-body")}
      {...props}
    />
  );
};

export default Marked;

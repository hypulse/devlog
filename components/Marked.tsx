import { mergeClasses } from "@/utils";
import hljs from "highlight.js";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { HTMLAttributes } from "react";
import "./../styles/markdown-body.scss";

interface MarkedProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

const renderer: marked.RendererObject = {
  code(code, lang) {
    return `<pre><code class="hljs language-${lang}">${code}</code></pre>`;
  },
  codespan(code) {
    return `<code class="hljs">${code}</code>`;
  },
};

const options: marked.MarkedOptions = {
  renderer: renderer as marked.Renderer,
  gfm: false,
};

marked.use(
  markedHighlight({
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  options
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

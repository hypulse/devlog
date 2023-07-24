import { marked } from "marked";
import hljs from "highlight.js";
import useTheme from "@/utils/app/hooks/useTheme";

marked.setOptions({
  renderer: new marked.Renderer(),
  langPrefix: "hljs language-",
  highlight: function (code, language) {
    return hljs.highlight(code, {
      language: hljs.getLanguage(language) ? language : "plaintext",
    }).value;
  },
});

const Marked = ({ content }: { content: string }) => {
  const { theme } = useTheme();
  return <div dangerouslySetInnerHTML={{ __html: marked(content) }} />;
};

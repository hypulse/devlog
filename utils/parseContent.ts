import baseMarked from "./baseMarked";

const parseMarkdownToHTML = (markdown: string): Document => {
  const htmlContent = baseMarked(markdown);
  const parser = new DOMParser();
  return parser.parseFromString(htmlContent, "text/html");
};

const extractTitle = (doc: Document): string => {
  return doc.querySelector("h1")?.textContent || "Untitled";
};

const extractSummary = (doc: Document, length = 3): string => {
  const paragraphs = Array.from(doc.querySelectorAll("p"))
    .slice(0, length)
    .map((p) => p.textContent);
  return paragraphs.join(" ").trim();
};

const countWords = (text: string): number => {
  return text.split(/\s+/g).filter(Boolean).length;
};

const parseContent = (content: string) => {
  const doc = parseMarkdownToHTML(content);

  return {
    title: extractTitle(doc),
    summary: extractSummary(doc),
    wordCount: countWords(doc.body.textContent || ""),
  };
};

export default parseContent;

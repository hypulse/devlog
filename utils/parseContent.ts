import { Marked } from "marked";

const parseMarkdownToHTML = (markdown: string): Document => {
  const htmlContent = new Marked().parse(markdown) as string;
  const parser = new DOMParser();
  return parser.parseFromString(htmlContent, "text/html");
};

const extractTitle = (doc: Document): string => {
  return doc.querySelector("h1")?.textContent || "Untitled";
};

const extractSummary = (doc: Document): string => {
  const paragraphs = Array.from(doc.querySelectorAll("p")).map(
    (p) => p.textContent
  );

  const fullText = paragraphs.join(" ").trim() || "";

  if (fullText.length > 200) {
    return fullText.slice(0, 200);
  } else {
    return fullText;
  }
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

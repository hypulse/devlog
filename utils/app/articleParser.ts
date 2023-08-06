import { marked } from "@/components/Marked";
import { CreateArticlePayload } from "@/types/apis";
import adjustImageQuality from "./adjustImageQuality";

export default async function articleParser(
  text: string
): Promise<Omit<CreateArticlePayload, "tags" | "type" | "status">> {
  const htmlString = marked.parse(text);
  const html = new DOMParser().parseFromString(htmlString, "text/html");
  const textContent = html.querySelector("body")?.textContent || "";

  let thumbnailImage = html.querySelector("img")?.src;
  if (thumbnailImage) {
    thumbnailImage = await adjustImageQuality(thumbnailImage, {
      width: 640,
      quality: 0.7,
    });
  }

  return {
    title: html.querySelector("h1")?.textContent || "",
    content: text,
    description: textContent.slice(0, 200),
    thumbnailImage: thumbnailImage,
    wordCount: textContent.split(/\s+/g).length,
  };
}

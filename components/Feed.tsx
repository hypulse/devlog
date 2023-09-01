import { PostTypeGet } from "@/types/post";
import Marked from "./Marked";
import Link from "next/link";
import sharePost from "@/utils/sharePost";

export default function Feed({ _id, title, createdAt, content }: PostTypeGet) {
  const { quote, code } = extractFirstQuoteAndCode(content);

  return (
    <div className="flex flex-col gap-y-rowGap bg-card rounded-xs p-cardPadding shadow">
      <h2 className="font-bold text-h2">{title}</h2>

      <div className="flex text-caption gap-x-colGap">
        <span>{new Date(createdAt).toLocaleString()}</span>
        <span>&middot;</span>
        <button
          onClick={() => {
            sharePost(title, quote || "");
          }}
        >
          Share
        </button>
        <span>&middot;</span>
        <Link href={`/admin/editor?id=${_id}`}>
          <span className="text-textSecondary">Edit</span>
        </Link>
      </div>

      {code && <Marked text={code || ""} />}

      {quote && <p>{quote}</p>}

      <div className="flex">
        <Link href={`/posts/${_id}`} className="text-primary">
          Comment
        </Link>
      </div>
    </div>
  );
}

function extractFirstQuoteAndCode(markdown: string = "") {
  const quoteRegex = /^>([^\n]+)/m;
  const blockCodeRegex = /(```[\s\S]*?```)/;

  const quoteMatch = markdown.match(quoteRegex);
  const blockCodeMatch = markdown.match(blockCodeRegex);

  const extractedQuote = quoteMatch ? quoteMatch[1].trim() : null;
  const extractedCode = blockCodeMatch ? blockCodeMatch[1].trim() : null;

  return {
    quote: extractedQuote,
    code: extractedCode,
  };
}

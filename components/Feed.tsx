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

      <Link href={`/posts/${_id}`} className="text-primary">
        Comment
      </Link>
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

function RiChat3Fill(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.291 20.824L2 22l1.176-5.291A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.956 9.956 0 0 1-4.709-1.176Z"
      ></path>
    </svg>
  );
}

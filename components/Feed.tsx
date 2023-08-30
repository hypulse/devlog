import { PostTypeGet } from "@/types/post";
import Marked from "./Marked";
import Link from "next/link";

export default function Feed({ _id, title, createdAt, content }: PostTypeGet) {
  const { quote, code } = extractFirstQuoteAndCode(content);

  return (
    <div className="bg-card shadow flex flex-col gap-y-rowGap">
      <Link href={`/posts/${_id}`}>
        <h2 className="font-bold text-h2 hover:text-primary">{title}</h2>
      </Link>

      <p>{quote}</p>

      <Marked text={code || ""} />

      <div className="flex text-caption gap-x-colGap text-textSecondary">
        <span>{new Date(createdAt).toLocaleString()}</span>
        <span>&middot;</span>
        <Link href={`/admin/editor?id=${_id}`}>
          <span>edit</span>
        </Link>
      </div>

      {/* <div className="flex items-center border-t border-border">
        <button className="p-gap flex items-center justify-center grow gap-x-xsGap">
          <RiChat3Fill />
          <span className="text-caption">Comment</span>
        </button>
        <button className="p-gap flex items-center justify-center grow gap-x-xsGap">
          <RiShareForwardFill />
          <span className="text-caption">Share</span>
        </button>
      </div> */}
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

function RiShareForwardFill(props: React.SVGProps<SVGSVGElement>) {
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
        d="M13 14h-2a8.999 8.999 0 0 0-7.968 4.81A10.133 10.133 0 0 1 3 18C3 12.477 7.477 8 13 8V3l10 8l-10 8v-5Z"
      ></path>
    </svg>
  );
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

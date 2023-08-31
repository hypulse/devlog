import { PostTypeGet } from "@/types/post";
import { useRouter } from "next/router";
import Marked from "./Marked";
import Button from "./Button";
import Link from "next/link";

export default function Feed({ _id, title, createdAt, content }: PostTypeGet) {
  const { push } = useRouter();
  const { quote, code } = extractFirstQuoteAndCode(content);

  return (
    <div className="p-cardPadding bg-card shadow rounded-xs overflow-hidden">
      <h2 className="font-bold text-h2 mb-rowGap">{title}</h2>

      {quote && <p className="mb-elementGap text-textSecondary">{quote}</p>}

      {code && <Marked text={code || ""} className="mb-elementGap" />}

      <div className="flex items-center flex-row-reverse justify-between flex-wrap gap-y-rowGap">
        <Button
          onClick={() => push(`/posts/${_id}`)}
          className="flex items-center bg-primary"
        >
          <RiChat3Fill className="mr-xsGap" />
          <span>Comment</span>
        </Button>
        <div className="flex text-caption gap-x-colGap flex-wrap">
          <span className="text-textSecondary">
            {new Date(createdAt).toLocaleString()}
          </span>
          <span>&middot;</span>
          <Link href={`/admin/editor?id=${_id}`}>
            <span className="text-textSecondary">edit</span>
          </Link>
        </div>
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

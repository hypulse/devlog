import { PostTypeGet } from "@/types/post";
import Marked from "./Marked";
import Link from "next/link";

export default function Feed({ _id, title, createdAt, content }: PostTypeGet) {
  const { quote, code } = extractFirstQuoteAndCode(content);

  return (
    <div className="bg-card shadow pt-cardPadding px-cardPadding">
      <h2 className="font-bold">{title}</h2>

      <p>{quote}</p>

      <Marked text={code || ""} />

      <div className="flex text-caption gap-x-colGap text-textSecondary">
        <span>{new Date(createdAt).toLocaleString()}</span>
        <span>&middot;</span>
        <Link href={`/admin/editor?id=${_id}`}>
          <span>edit</span>
        </Link>
      </div>

      <div className="flex border-t border-border">
        <Button>
          <RiChat3Fill />
          <span>Comment</span>
        </Button>
        <Button>
          <RiShareFill />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
}

const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="flex grow items-center justify-center gap-x-xsGap py-gap">
    {children}
  </button>
);

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

function RiShareFill(props: React.SVGProps<SVGSVGElement>) {
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
        d="m13.576 17.271l-5.11-2.787a3.5 3.5 0 1 1 0-4.968l5.11-2.787a3.5 3.5 0 1 1 .958 1.755l-5.11 2.787a3.514 3.514 0 0 1 0 1.457l5.11 2.788a3.5 3.5 0 1 1-.958 1.755Z"
      ></path>
    </svg>
  );
}

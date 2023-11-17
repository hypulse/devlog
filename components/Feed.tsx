import { PostTypeGet } from "@/types/post";
import MarkedViewer from "./MarkedViewer";
import Link from "next/link";
import { ButtonBase } from "./Button";
import sharePost from "@/utils/sharePost";

export default function Feed({ id, title, createdAt, content }: PostTypeGet) {
  const { quote, code } = extractFirstQuoteAndCode(content);

  return (
    <div className="flex flex-col gap-y-rowGap">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-h2">{title}</h2>
        <ButtonBase
          className="border border-primary text-primary px-tagPaddingX py-tagPaddingY rounded-full flex items-center gap-x-xsGap opacity-50 hover:opacity-100"
          onClick={() => {
            sharePost(
              title,
              quote || "",
              window.location.origin + "/posts/" + id
            );
          }}
        >
          <RiShareForwardFill />
          <span>Share</span>
        </ButtonBase>
      </div>

      {quote && <p>{quote}</p>}

      {code && (
        <MarkedViewer
          text={code || ""}
          className="rounded overflow-hidden border border-border"
        />
      )}

      <div className="flex text-caption gap-x-colGap text-textSecondary">
        <time dateTime={new Date(createdAt).toISOString()}>
          {new Date(createdAt).toLocaleString()}
        </time>
        <span>&middot;</span>
        <Link href={`/admin/editor?id=${id}`}>
          <span>Edit</span>
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

import { PostTypeGet } from "@/types/post";

export default function Feed({ _id, title, createdAt, content }: PostTypeGet) {
  const { paragraph, code } = extractFirstParagraphAndCode(content);

  return null;
  // <div className="p-cardPadding pb-0 roundd-sm bg-card shadow">
  //   <div className="flex justify-between items-center text-h2">
  //     <div className="font-bold">{title}</div>
  //   </div>
  //   <div className="mt-rowGap">{paragraph}</div>
  //   <div className="mt-gap">
  //     <Marked text={code || ""} />
  //   </div>

  //   <div className="text-textSecondary text-caption py-gap justify-between flex items-center gap-x-colGap">
  //     <div className="text-caption">
  //       {new Date(createdAt).toLocaleString()}
  //     </div>
  //     <span>edit</span>
  //   </div>

  //   <div className="flex items-center border-t border-border">
  //     <button className="p-gap flex items-center justify-center grow gap-x-xsGap">
  //       <RiChat3Fill />
  //       <span className="text-caption">Comment</span>
  //     </button>
  //     <button className="p-gap flex items-center justify-center grow gap-x-xsGap">
  //       <RiShareForwardFill />
  //       <span className="text-caption">Share</span>
  //     </button>
  //   </div>
  // </div>
}

function extractFirstParagraphAndCode(markdownString: string = "") {
  const paragraphRegex = /^>([^\n]+)/m;
  const codeRegex = /(```[\s\S]*?```)/;

  const paragraphMatch = markdownString.match(paragraphRegex);
  const codeMatch = markdownString.match(codeRegex);

  const firstParagraph = paragraphMatch ? paragraphMatch[1].trim() : null;
  const firstCode = codeMatch ? codeMatch[1].trim() : null;

  return {
    paragraph: firstParagraph,
    code: firstCode,
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

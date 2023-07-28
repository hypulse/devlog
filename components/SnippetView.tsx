import { ArticleSchema } from "@/types/schema";
import Marked from "./Marked";
import Link from "next/link";
import { MdiCommentMultiple } from "./icons";

const SnippetView = ({ _id, content = "" }: ArticleSchema) => {
  return (
    <div className="flex flex-col border p-cardPadding bg-cardColor rounded-small space-y-extraSpacing border-borderColor">
      <Marked content={content} />
      <Link
        href={`/posts/${_id}`}
        className="flex items-center justify-center border rounded border-primary text-primary px-buttonPaddingX py-buttonPaddingY text-caption"
      >
        <MdiCommentMultiple className="mr-columnGap" />
        <span>Read comments</span>
      </Link>
    </div>
  );
};

export default SnippetView;

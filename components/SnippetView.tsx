import { ArticleSchema } from "@/types/schema";
import Marked from "./Marked";
import Link from "next/link";
import { UilCommentsAlt } from "./icons";

const SnippetView = ({
  _id,
  title,
  content = "",
  description = "",
}: ArticleSchema) => {
  return (
    <div className="flex flex-col border p-cardPadding bg-cardColor rounded-small space-y-extraSpacing border-borderColor">
      <Marked content={content} />
      <Link
        href={`/posts/${_id}`}
        className="flex items-center justify-center mt-auto border rounded border-primary text-primary px-buttonPaddingX py-buttonPaddingY text-caption"
      >
        <UilCommentsAlt className="mr-columnGap" />
        <span>View replies</span>
      </Link>
    </div>
  );
};

export default SnippetView;

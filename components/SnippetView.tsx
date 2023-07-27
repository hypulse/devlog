import { ArticleSchema } from "@/types/schema";
import Marked from "./Marked";
import Link from "next/link";
import { MdiComment } from "./icons";

const SnippetView = ({
  _id,
  title,
  content = "",
  description = "",
}: ArticleSchema) => {
  return (
    <div className="flex flex-col border p-cardPadding bg-cardColor rounded-small space-y-extraSpacing border-borderColor">
      <h1 className="font-bold text-title">{title}</h1>
      <Marked content={content} />
      <p>{description}</p>
      <Link
        href={`/posts/${_id}`}
        className="flex items-center justify-center mt-auto border rounded border-primary text-primary px-buttonPaddingX py-buttonPaddingY text-caption"
      >
        <MdiComment className="mr-columnGap" />
        <span>View replies</span>
      </Link>
    </div>
  );
};

export default SnippetView;

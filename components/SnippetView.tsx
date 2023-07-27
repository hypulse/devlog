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
    <div className="flex flex-col border p-cardPadding border-borderColor bg-cardColor rounded-small">
      <h1 className="font-bold text-subTitle mb-rowGap">{title}</h1>
      <Marked content={content} className="mb-rowGap" />
      <p className="mb-elementSpacing">{description}</p>
      <Link
        href={`/posts/${_id}`}
        className="flex items-center self-end border rounded px-buttonPaddingX py-buttonPaddingY border-primary text-caption text-primary"
      >
        <MdiComment className="mr-columnGap" />
        <span>View replies</span>
      </Link>
    </div>
  );
};

export default SnippetView;

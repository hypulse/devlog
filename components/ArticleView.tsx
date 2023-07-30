import { ArticleSchema, TagSchema } from "@/types/schema";
import Marked from "./Marked";
import {
  formatRelativeDate,
  getEstimatedReadTime,
} from "@/utils/app/timeAndDateRenders";
import { BasilShareBoxSolid, FluentCommentAdd12Regular } from "./icons";
import Link from "next/link";
import Profile from "./Profile";
import { shareData } from "@/utils/app/interactiveFeatures";

const ArticleView = ({
  _id,
  title,
  content,
  tags,
  createdAt,
  wordCount,
  description,
}: ArticleSchema) => {
  return (
    <div
      className="flex flex-col border p-containerPadding bg-cardColor border-borderColor gap-y-sectionSpacing"
      style={{
        marginTop: "-7rem",
        paddingTop: "7rem",
      }}
    >
      <div className="space-y-extraSpacing">
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>{title}</h1>
        <div className="flex items-center space-x-columnGap">
          <Profile size={2.25} href="/" />
          <div>
            <span className="text-caption">Hypulse</span>
            <div className="flex items-center space-x-columnGap text-meta text-textSecondaryColor">
              <span>{formatRelativeDate(createdAt)}</span>
              <span>&middot;</span>
              <span>{getEstimatedReadTime(wordCount)}</span>
            </div>
          </div>
        </div>
        <CommentsAndShare title={title} description={description} _id={_id} />
      </div>
      <Marked content={content} />
      <div className="space-y-extraSpacing">
        <CommentsAndShare title={title} description={description} _id={_id} />
        {tags && <Tags tags={tags} />}
      </div>
    </div>
  );
};

const CommentsAndShare = ({
  title,
  description,
  _id,
}: {
  title: string;
  description?: string;
  _id: string;
}) => {
  const handleCommentClick = () => {
    const utterances = document.getElementById("utterances");
    if (utterances) {
      utterances.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShareClick = () => {
    shareData({
      title,
      text: description || "",
      url: location.origin + "/posts/" + _id,
    });
  };

  return (
    <div className="flex items-center justify-end divide-x text-meta text-textSecondaryColor border-y border-borderColor py-buttonPaddingY px-buttonPaddingX divide-borderColor">
      <button
        className="flex items-center justify-center grow basis-0 space-x-columnGap"
        onClick={handleCommentClick}
      >
        <FluentCommentAdd12Regular className="text-extra" />
        <span className="text-caption">Comments</span>
      </button>
      <button
        className="flex items-center justify-center grow basis-0 space-x-columnGap"
        onClick={handleShareClick}
      >
        <BasilShareBoxSolid className="text-extra" />
        <span className="text-caption">Share</span>
      </button>
    </div>
  );
};

const Tags = ({ tags }: { tags: Array<TagSchema> }) => {
  return (
    <div className="flex flex-wrap items-center">
      <div className="flex flex-wrap items-center justify-center -m-tagPaddingY">
        {tags.map((tag) => (
          <Link
            key={tag._id}
            href={`/posts?tag=${tag._id}`}
            className="m-tagPaddingY"
          >
            <div className="inline-flex items-center border rounded-full px-tagPaddingX py-tagPaddingY text-caption border-borderColor text-primary bg-cardColor">
              {tag.name.toLocaleLowerCase()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleView;

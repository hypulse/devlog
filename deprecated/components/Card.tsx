import { CardData } from "@/deprecated/types/data";
import {
  formatRelativeDate,
  getEstimatedReadTime,
} from "@/utils/app/timeAndDateRenders";
import Link from "next/link";

const Card = ({
  _id,
  createdAt,
  title,
  wordCount,
  description,
  thumbnailImage,
}: CardData) => {
  return (
    <Link
      href={`/posts/${_id}`}
      className="block border p-cardPadding bg-cardColor border-borderColor group tablet:flex tablet:space-x-cardPadding tablet:items-start rounded-small"
    >
      <div className="overflow-hidden rounded aspect-video basis-1/3 grow mb-extraSpacing tablet:mb-0">
        <div
          className="w-full h-full scale-100 bg-center bg-cover group-hover:scale-125"
          style={{
            backgroundImage: `url(${
              thumbnailImage || "/images/placeholder.png"
            })`,
          }}
        />
      </div>
      <div className="basis-2/3 grow">
        <div className="mb-extraSpacing">
          <h2 className="font-bold text-subTitle mb-columnGap group-hover:text-primary">
            {title}
          </h2>
          <p className="text-body text-textSecondaryColor line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex items-center space-x-columnGap text-meta text-textSecondaryColor">
          <span>{formatRelativeDate(new Date(createdAt))}</span>
          <span>&middot;</span>
          <span>{getEstimatedReadTime(wordCount)}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;

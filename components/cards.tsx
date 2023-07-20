import { ArticleCardData } from "@/types/data";
import Link from "next/link";

const ArticleCard = ({
  _id,
  createdAt,
  title,
  tags,
  type,
  wordCount,
  description,
  thumbnailImage,
}: ArticleCardData) => {
  return (
    <Link href="#">
      <div className="block border p-cardPadding bg-cardColor border-borderColor group tablet:flex tablet:gap-x-elementSpacing tablet:items-center">
        <div className="overflow-hidden rounded aspect-video tablet:aspect-square basis-1/4 grow mb-elementSpacing tablet:mb-0">
          <div
            className="w-full h-full scale-100 bg-center bg-cover group-hover:scale-125 app-transition"
            style={{
              backgroundImage: `url(${"http://placehold.it/800x450"})`,
            }}
          ></div>
        </div>
        <div className="basis-3/4 grow">
          <div className="mb-elementSpacing">
            <div className="flex items-center mb-tagSpacingY gap-x-columnGap text-meta text-textSecondaryColor">
              <span>15 hours ago</span>
              <span>&middot;</span>
              <span>5 min read</span>
            </div>
            <h2 className="font-bold text-subTitle mb-columnGap group-hover:text-primary app-transition">
              AI quiz: Can you tell which person is real?
            </h2>
            <p className="text-caption text-textSecondaryColor line-clamp-3">
              How much do you know about Artificial Intelligence? As the
              technology rapidly advances, test your knowledge of how AI affects
              life now and its possible impacts in the near future.
            </p>
          </div>
          <div className="flex items-center gap-x-columnGap">
            <div className="border rounded px-tagSpacingX py-tagSpacingY border-borderColor text-meta text-secondary">
              javascript
            </div>
            <div className="border rounded px-tagSpacingX py-tagSpacingY border-borderColor text-meta text-secondary">
              react
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { ArticleCard };

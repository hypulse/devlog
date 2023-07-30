import Search from "@/components/Search";
import SmallCard from "@/components/SmallCard";
import { cardDataDummy } from "@/utils/app/dummy";

export default function Page() {
  return (
    <main className="mx-auto max-w-screen-desktop px-containerPadding space-y-sectionSpacing">
      <Search />
      <div>
        <div className="mb-elementSpacing text-caption text-textSecondaryColor">
          2 results found
        </div>
        <div className="grid grid-cols-1 divide-y gap-x-rowGap divide-borderColor border-y border-borderColor">
          <div className="relative even:bg-cardColor">
            <SmallCard
              {...cardDataDummy}
              className="py-elementSpacing px-cardPadding"
            />
            <div className="absolute top-0 right-0 bg-secondary rounded-bl-small text-meta px-tagPaddingX">
              {cardDataDummy.type}
            </div>
          </div>
          <div className="relative even:bg-cardColor">
            <SmallCard
              {...cardDataDummy}
              className="py-elementSpacing px-cardPadding"
            />
            <div className="absolute top-0 right-0 bg-secondary rounded-bl-small text-meta px-tagPaddingX">
              {cardDataDummy.type}
            </div>
          </div>
          <div className="relative even:bg-cardColor">
            <SmallCard
              {...cardDataDummy}
              className="py-elementSpacing px-cardPadding"
            />
            <div className="absolute top-0 right-0 bg-secondary rounded-bl-small text-meta px-tagPaddingX">
              {cardDataDummy.type}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import Search from "@/components/Search";
import SmallCard from "@/components/SmallCard";
import { cardDataDummy } from "@/utils/app/dummy";

export default function Page() {
  return (
    <main className="mx-auto max-w-screen-desktop px-containerPadding space-y-sectionSpacing">
      <Search />
      <div>
        <div className="mb-elementSpacing text-caption text-textSecondaryColor">
          <span className="text-primary">2</span> results
        </div>
        <div className="grid grid-cols-1 gap-y-columnGap gap-x-rowGap tablet:grid-cols-2">
          <SmallCard {...cardDataDummy} />
          <SmallCard {...cardDataDummy} />
        </div>
      </div>
    </main>
  );
}

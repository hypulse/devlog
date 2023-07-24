import { HideOnTablet, SearchBox } from "@/components/layouts";

export default function Page() {
  return (
    <main className="mx-auto max-w-screen-desktop px-containerPadding space-y-sectionSpacing">
      <HideOnTablet>
        <div className="text-extra">
          <SearchBox />
        </div>
      </HideOnTablet>
    </main>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="w-full h-[3rem] border-b border-borderColor mb-sectionSpacing bg-cardColor">
        <div className="mx-auto max-w-screen-desktop px-containerPadding"></div>
      </header>
      <main className="mx-auto max-w-screen-desktop px-containerPadding">
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
                <h2 className="font-bold text-subTitle mb-columnGap group-hover:text-primary app-transition">
                  AI quiz: Can you tell which person is real?
                </h2>
                <p className="text-caption text-textSecondaryColor">
                  How much do you know about Artificial Intelligence? As the
                  technology rapidly advances, test your knowledge of how AI
                  affects life now and its possible impacts in the near future.
                </p>
              </div>
              <div className="flex gap-x-columnGap">
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
      </main>
    </>
  );
}

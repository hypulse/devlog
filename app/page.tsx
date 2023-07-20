import { ArticleCard } from "@/components/cards";
import { ArticleCardData } from "@/types/data";

const articleCardDataDummy: ArticleCardData = {
  _id: "1",
  createdAt: new Date(2023, 6, 20),
  title: "AI quiz: Can you tell which person is real?",
  tags: [
    { _id: "1", name: "javascript" },
    { _id: "2", name: "typescript" },
  ],
  type: "article",
  wordCount: 1000,
  description:
    "How much do you know about Artificial Intelligence? As the technology rapidly advances, test your knowledge of how AI affects life now and its possible impacts in the near future.",
  thumbnailImage: "http://placehold.it/800x450",
};

export default function Home() {
  return (
    <>
      <header className="w-full h-[3rem] border-b border-borderColor mb-sectionSpacing bg-cardColor">
        <div className="flex items-center h-full mx-auto max-w-screen-desktop px-containerPadding text-extra"></div>
      </header>
      <main className="mx-auto max-w-screen-desktop px-containerPadding">
        <ArticleCard {...articleCardDataDummy} />
      </main>
    </>
  );
}

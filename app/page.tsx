"use client";

import { ArticleCard, ArticleCardSmall } from "@/components/cards";
import { LoadingSpinner, ScrollToTopButton } from "@/components/layout";
import { ArticleCardData } from "@/types/data";
import { useCallback, useEffect, useRef, useState } from "react";

const articleCardDataDummy: ArticleCardData = {
  _id: "1",
  createdAt: new Date(2023, 6, 20),
  title: "AI quiz: Can you tell which person is real?",
  type: "article",
  wordCount: 1000,
  description:
    "How much do you know about Artificial Intelligence? As the technology rapidly advances, test your knowledge of how AI affects life now and its possible impacts in the near future.",
};

export default function Home() {
  const [articles, setArticles] = useState(Array.from({ length: 10 }));
  const [lastIndex, setLastIndex] = useState(100);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!loading) return;

      if (articles.length >= lastIndex) {
        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setArticles((prevArticles) => [
        ...prevArticles,
        ...Array.from({ length: 10 }),
      ]);
      setLoading(false);
    })();
  }, [loading, articles]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <>
      <LoadingSpinner />
      <ScrollToTopButton />
      <main className="mx-auto max-w-screen-desktop px-containerPadding space-y-sectionSpacing">
        <div>
          <div className="flex mb-elementSpacing">
            <h2 className="font-bold text-subTitle">Snippets</h2>
            <div className="flex-grow" />
            <button className="text-caption text-textSecondaryColor px-buttonSpacingX">
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 gap-y-columnGap gap-x-rowGap tablet:grid-cols-2">
            <ArticleCardSmall {...articleCardDataDummy} />
            <ArticleCardSmall {...articleCardDataDummy} />
            <ArticleCardSmall {...articleCardDataDummy} />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-subTitle mb-elementSpacing">
            <span className="text-primary">Latest</span> articles
          </h2>
          <div className="flex flex-col gap-y-elementSpacing">
            {articles.map((_, index) => (
              <ArticleCard key={index} {...articleCardDataDummy} />
            ))}
            <div ref={loader} className="flex justify-center">
              {!loading && articles.length >= lastIndex ? (
                <ScrollToTopButton />
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

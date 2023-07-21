"use client";

import { ArticleCard, ArticleCardSmall } from "@/components/cards";
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
  const [articles, setArticles] = useState(Array.from({ length: 20 }));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMore();
    }
  }, []);

  const loadMore = () => {
    setLoading(true);
    if (articles.length >= 212) {
      setLoading(false);
      return;
    }
    setPage((prevPage) => prevPage + 1);
    setArticles((prevArticles) => [
      ...prevArticles,
      ...Array.from({ length: 20 }),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div>
      {/* <main className="mx-auto max-w-screen-desktop px-containerPadding space-y-sectionSpacing">
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
            <ArticleCardSmall {...articleCardDataDummy} />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-subTitle mb-elementSpacing">
            <span className="text-primary">Latest</span> articles
          </h2>
          <div className="flex flex-col gap-y-elementSpacing">
            <ArticleCard {...articleCardDataDummy} />
            <ArticleCard {...articleCardDataDummy} />
          </div>
        </div>
      </main> */}
      <div className="container">
        {articles.map((_, index) => (
          <div key={index} className="p-cardPadding">
            {index}
          </div>
        ))}
        <div className="loading" ref={loader}>
          {loading && <h2>로딩중...</h2>}
          {!loading && articles.length >= 212 && (
            <h2>더 이상 컨텐츠가 없습니다.</h2>
          )}
        </div>
      </div>
      {/* <div className="h-sectionSpacing" ref={loader} /> */}
    </div>
  );
}

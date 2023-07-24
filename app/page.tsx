"use client";

import { ArticleCard, ArticleCardSmall } from "@/components/cards";
import {
  HideOnTablet,
  LoadingSpinner,
  ScrollToTopButton,
  SearchBox,
} from "@/components/layouts";
import { cardDataDummy } from "@/utils/app/dummy";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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
    <main className="mx-auto max-w-screen-desktop px-containerPadding space-y-sectionSpacing">
      <HideOnTablet>
        <div className="text-extra">
          <SearchBox />
        </div>
      </HideOnTablet>
      <div>
        <div className="flex mb-elementSpacing">
          <h2 className="font-bold text-subTitle">Snippets</h2>
          <div className="flex-grow" />
          <Link href={`/snippets`}>
            <button className="text-caption text-textSecondaryColor px-buttonSpacingX">
              View all
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-y-columnGap gap-x-rowGap tablet:grid-cols-2">
          <ArticleCardSmall {...cardDataDummy} />
          <ArticleCardSmall {...cardDataDummy} />
          <ArticleCardSmall {...cardDataDummy} />
        </div>
      </div>
      <div>
        <h2 className="font-bold text-subTitle mb-elementSpacing">
          <span className="text-primary">Latest</span> articles
        </h2>
        <div className="flex flex-col gap-y-elementSpacing">
          {articles.map((_, index) => (
            <ArticleCard key={index} {...cardDataDummy} />
          ))}
          <div ref={loader}>
            {!loading && articles.length >= lastIndex ? (
              <ScrollToTopButton />
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

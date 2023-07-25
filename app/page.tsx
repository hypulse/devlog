"use client";

import { ArticleCard, CardSmall } from "@/components/cards";
import {
  HideOnTablet,
  LoadingSpinner,
  ScrollToTopButton,
  SearchBox,
} from "@/components/layouts";
import { cardDataDummy } from "@/utils/app/dummy";
import useIntersectionObserver from "@/utils/app/hooks/useIntersectionObserver";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { loader, loading, setLoading } = useIntersectionObserver();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      if (!loading) return;

      // const { lastIndex, data } = await new Promise((resolve) =>
      //   setTimeout(resolve, 1000)
      // );

      // if (items.length >= lastIndex) {
      //   setLoading(false);
      //   return;
      // }

      // setItems((prevItems) => [...prevItems, ...data]);
      setLoading(false);
    })();
  }, [loading, items]);

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
            <button className="text-caption text-textSecondaryColor px-buttonPaddingX">
              View all
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-y-columnGap gap-x-rowGap tablet:grid-cols-2"></div>
      </div>
      <div>
        <h2 className="font-bold text-subTitle mb-elementSpacing">
          <span className="text-primary">Latest</span> articles
        </h2>
        <div className="flex flex-col gap-y-elementSpacing">
          {items.map((_, index) => (
            <ArticleCard key={index} {...cardDataDummy} />
          ))}
          <div ref={loader}>
            {!loading && items.length >= lastIndex ? (
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

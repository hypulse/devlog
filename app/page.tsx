"use client";

import Search from "@/components/Search";
import { LoadingSpinner, ScrollToTopButton } from "@/components/layouts";
import useIntersectionObserver from "@/utils/app/hooks/useIntersectionObserver";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-desktop px-containerPadding space-y-sectionSpacing">
      <Search />
      <div>
        <div className="flex items-center mb-elementSpacing">
          <h2 className="flex-grow font-bold text-subTitle">Snippets</h2>
          <Link
            href={`/snippets`}
            className="block text-caption text-textSecondaryColor px-buttonPaddingX py-buttonPaddingY"
          >
            View all
          </Link>
        </div>
        <Snippets />
      </div>
      <div>
        <h2 className="font-bold text-subTitle mb-elementSpacing">
          <span className="text-primary">Latest</span> articles
        </h2>
        <Articles />
      </div>
    </main>
  );
}

const Snippets = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-y-columnGap gap-x-rowGap tablet:grid-cols-2">
      {}
    </div>
  );
};

const Articles = () => {
  const { loader, loading, setLoading } = useIntersectionObserver();
  const [items, setItems] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    (async () => {
      if (!loading) return;

      if (items.length >= lastIndex) {
        setLoading(false);
        return;
      }

      setItems((prevItems) => [...prevItems]);
      setLastIndex(0);
      setLoading(false);
    })();
  }, [loading, items]);

  return (
    <div className="flex flex-col gap-y-elementSpacing">
      {}
      <div ref={loader}>
        {!loading && items.length >= lastIndex ? (
          <ScrollToTopButton />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

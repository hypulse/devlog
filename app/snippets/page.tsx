"use client";

import SnippetView from "@/components/SnippetView";
import { LoadingSpinner, ScrollToTopButton } from "@/components/layouts";
import { articleDataDummy } from "@/utils/app/dummy";
import useIntersectionObserver from "@/utils/app/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";

export default function Page() {
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
    <main className="flex flex-col mx-auto max-w-screen-desktop px-containerPadding gap-y-elementSpacing">
      <SnippetView {...articleDataDummy} />
      <div ref={loader}>
        {!true && items.length >= lastIndex ? (
          <ScrollToTopButton />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </main>
  );
}

"use client";

import SnippetView from "@/components/SnippetView";
import { LoadingSpinner, ScrollToTopButton } from "@/components/layouts";
import { articleDataDummy } from "@/utils/app/dummy";
import useIntersectionObserver from "@/utils/app/hooks/useIntersectionObserver";
import { useState } from "react";

export default function Page() {
  const { loader, loading, setLoading } = useIntersectionObserver();
  const [items, setItems] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);

  return (
    <main className="flex flex-col mx-auto max-w-screen-desktop px-containerPadding gap-y-elementSpacing">
      <SnippetView {...articleDataDummy} />
      <div ref={loader}>
        {!loading && items.length >= lastIndex ? (
          <ScrollToTopButton />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </main>
  );
}

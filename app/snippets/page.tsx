"use client";

import Loader from "@/components/Loader";
import SnippetView from "@/components/SnippetView";
import { snippetDataDummy } from "@/utils/app/dummy";
import useIntersectionObserver from "@/utils/app/hooks/useIntersectionObserver";
import { useState } from "react";

export default function Page() {
  const { loader, loading, setLoading } = useIntersectionObserver();
  const [items, setItems] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);

  return (
    <main className="flex flex-col mx-auto max-w-screen-desktop px-containerPadding gap-y-extraSpacing">
      <SnippetView {...snippetDataDummy} />
      <SnippetView {...snippetDataDummy} />
      <Loader
        loader={loader}
        loading={loading}
        items={items}
        lastIndex={lastIndex}
      />
    </main>
  );
}

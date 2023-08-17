"use client";

import Loader from "@/deprecated/components/Loader";
import SnippetView from "@/deprecated/components/SnippetView";
import { snippetDataDummy } from "@/utils/app/dummy";
import useIntersectionObserver from "@/utils/app/hooks/useIntersectionObserver";
import { useState } from "react";

export default function Page() {
  const { loader, loading, setLoading } = useIntersectionObserver();
  const [items, setItems] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);

  return (
    <main className="flex flex-col mx-auto max-w-screen-desktop tablet:px-containerPadding gap-y-extraSpacing">
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

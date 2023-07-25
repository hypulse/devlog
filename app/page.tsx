"use client";

import Card from "@/components/Card";
import Loader from "@/components/Loader";
import Search from "@/components/Search";
import SmallCard from "@/components/SmallCard";
import { cardDataDummy } from "@/utils/app/dummy";
import useIntersectionObserver from "@/utils/app/hooks/useIntersectionObserver";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <div className="grid grid-cols-1 gap-y-columnGap gap-x-rowGap tablet:grid-cols-2">
      <SmallCard {...cardDataDummy} />
    </div>
  );
};

const Articles = () => {
  const { loader, loading, setLoading } = useIntersectionObserver();
  const [items, setItems] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);

  return (
    <div className="flex flex-col gap-y-elementSpacing">
      <Card {...cardDataDummy} />
      <Loader
        loader={loader}
        loading={loading}
        items={items}
        lastIndex={lastIndex}
      />
    </div>
  );
};

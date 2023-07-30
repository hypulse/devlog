"use client";

import ArticleView from "@/components/ArticleView";
import SmallCard from "@/components/SmallCard";
import SnippetView from "@/components/SnippetView";
import { ArticleSchema } from "@/types/schema";
import { articleDataDummy, cardDataDummy } from "@/utils/app/dummy";
import { useEffect, useRef } from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="mx-auto max-w-screen-desktop tablet:px-containerPadding space-y-sectionSpacing">
      <View {...articleDataDummy} />
      <PrevAndNext />
    </main>
  );
}

const View = (data: ArticleSchema) => {
  switch (data.type) {
    case "article":
      return <ArticleView {...data} />;
    case "snippet":
      return <SnippetView {...data} />;
    default:
      return null;
  }
};

const PrevAndNext = () => {
  return (
    <div className="grid grid-cols-1 gap-y-columnGap gap-x-rowGap tablet:grid-cols-2">
      <div>
        <p className="text-meta text-textSecondaryColor px-tagPaddingX py-tagPaddingY">
          &larr; Previous
        </p>
        <SmallCard {...cardDataDummy} />
      </div>
      <div>
        <p className="text-right text-meta text-textSecondaryColor px-tagPaddingX py-tagPaddingY">
          Next &rarr;
        </p>
        <SmallCard {...cardDataDummy} />
      </div>
    </div>
  );
};

"use client";

import { ArticleCardSmall } from "@/components/cards";
import { LoadingSpinner } from "@/components/layouts";
import { TagWrapper } from "@/components/tags";
import { ArticleData, SnippetData } from "@/types/data";
import { articleDataDummy, cardDataDummy } from "@/utils/app/dummy";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);

  return (
    <main className="mx-auto max-w-screen-desktop tablet:px-containerPadding space-y-sectionSpacing">
      {loading ? <LoadingSpinner /> : <View data={articleDataDummy} />}
      <div className="grid grid-cols-1 gap-y-columnGap gap-x-rowGap tablet:grid-cols-2">
        <div>
          <p className="text-meta text-textSecondaryColor px-tagSpacingX py-tagSpacingY">
            &larr; Previous
          </p>
          <ArticleCardSmall {...cardDataDummy} />
        </div>
        <div>
          <p className="text-right text-meta text-textSecondaryColor px-tagSpacingX py-tagSpacingY">
            Next &rarr;
          </p>
          <ArticleCardSmall {...cardDataDummy} />
        </div>
      </div>
    </main>
  );
}

const View = ({ data }: { data: ArticleData | SnippetData }) => {
  switch (data.type) {
    case "article":
      return <ArticleTypeView data={data} />;
    case "snippet":
      return <SnippetTypeView data={data} />;
    default:
      return null;
  }
};

const ArticleTypeView = ({ data }: { data: ArticleData }) => {
  return (
    <div className="border p-cardPadding bg-cardColor border-borderColor">
      <div className="mb-sectionSpacing">
        <h1 className="font-bold text-title">{data.title}</h1>
        {data.tags && (
          <div className="mt-elementSpacing">
            <TagWrapper tags={data.tags} />
          </div>
        )}
      </div>
      <article>{data.content}</article>
    </div>
  );
};

const SnippetTypeView = ({ data }: { data: SnippetData }) => {
  return <div>Snippet</div>;
};
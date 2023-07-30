"use client";

import ArticleView from "@/components/ArticleView";
import SmallCard from "@/components/SmallCard";
import SnippetView from "@/components/SnippetView";
import { ArticleSchema } from "@/types/schema";
import { articleDataDummy, cardDataDummy } from "@/utils/app/dummy";
import useTheme from "@/utils/app/hooks/useTheme";
import { useEffect, useRef } from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="mx-auto max-w-screen-desktop tablet:px-containerPadding space-y-elementSpacing">
      <View {...articleDataDummy} />
      <PrevAndNext />
      <Comments />
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

const Comments = () => {
  const { theme } = useTheme();
  const utterances = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!utterances.current) return;

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "hypulse/devlog-comments");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute(
      "theme",
      `github-${theme === "dark" ? "dark" : "light"}`
    );
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    utterances.current.appendChild(script);

    return () => {
      if (
        utterances.current &&
        utterances.current.children &&
        utterances.current.children[0]
      ) {
        utterances.current.removeChild(utterances.current.children[0]);
      }
    };
  }, [utterances, theme]);

  return (
    <div
      ref={utterances}
      id="utterances"
      className="border bg-cardColor border-borderColor"
    />
  );
};

const PrevAndNext = () => {
  return (
    <div className="grid grid-cols-1 border divide-y tablet:divide-y-0 tablet:divide-x tablet:grid-cols-2 bg-cardColor border-borderColor divide-borderColor">
      <div>
        <p className="text-meta text-textSecondaryColor px-tagPaddingX py-tagPaddingY">
          &larr; Previous
        </p>
        <SmallCard {...cardDataDummy} className="p-cardPadding" />
      </div>
      <div>
        <p className="text-right text-meta text-textSecondaryColor px-tagPaddingX py-tagPaddingY">
          Next &rarr;
        </p>
        <SmallCard {...cardDataDummy} className="p-cardPadding" />
      </div>
    </div>
  );
};

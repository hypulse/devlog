"use client";

import Marked from "@/components/Marked";
import { LoadingSpinner } from "@/components/layouts";
import { TagWrapper } from "@/components/tags";
import { articleDataDummy, cardDataDummy } from "@/utils/app/dummy";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);

  return (
    <main className="mx-auto max-w-screen-desktop tablet:px-containerPadding space-y-sectionSpacing">
      {/* {loading ? <LoadingSpinner /> : <View data={articleDataDummy} />}
      <div className="grid grid-cols-1 gap-y-columnGap gap-x-rowGap tablet:grid-cols-2">
        <div>
          <p className="text-meta text-textSecondaryColor px-tagPaddingX py-tagPaddingY">
            &larr; Previous
          </p>
        </div>
        <div>
          <p className="text-right text-meta text-textSecondaryColor px-tagPaddingX py-tagPaddingY">
            Next &rarr;
          </p>
        </div>
      </div> */}
    </main>
  );
}

const View = ({ data }: { data: "" }) => {
  // switch (data.type) {
  //   case "article":
  //     return <ArticleTypeView data={data} />;
  //   case "snippet":
  //     return <SnippetTypeView data={data} />;
  //   default:
  //     return null;
  // }
};

const ArticleTypeView = ({ data }: { data: "" }) => {
  // return (
  //   <div className="border p-cardPadding bg-cardColor dark:bg-[#0d1117] border-borderColor">
  //     <div className="mb-sectionSpacing">
  //       <h1 className="font-bold text-title">{data.title}</h1>
  //       {data.tags && (
  //         <div className="mt-elementSpacing">
  //           <TagWrapper tags={data.tags} />
  //         </div>
  //       )}
  //     </div>
  //     <article>
  //       <Marked className="" content={data.content} />
  //     </article>
  //   </div>
  // );
};

const SnippetTypeView = ({ data }: { data: "" }) => {
  return null;
};

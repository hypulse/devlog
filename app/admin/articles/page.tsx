"use client";

import Pagination from "@/components/Pagination";
import SmallCard from "@/components/SmallCard";
import {
  IcBaselineDelete,
  IcBaselineDisabledVisible,
  IcBaselineEdit,
} from "@/components/icons";
import { Button } from "@/components/inputs";
import { cardDataDummy } from "@/utils/app/dummy";
import { formatRelativeDate } from "@/utils/app/timeAndDateRenders";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="flex flex-col mx-auto max-w-screen-desktop px-containerPadding space-y-sectionSpacing">
      <div className="flex items-center gap-x-columnGap">
        <div>
          <p className="text-meta text-textSecondaryColor mb-tagPaddingY">
            Status
          </p>
          <select name="status" className="bg-transparent">
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <p className="text-meta text-textSecondaryColor mb-tagPaddingY">
            Type
          </p>
          <select name="type" className="bg-transparent">
            <option value="all">All</option>
            <option value="article">Article</option>
            <option value="snippet">Snippet</option>
          </select>
        </div>
        <div className="flex-grow" />
        <Link href="/admin/articles/post">
          <Button>Post Article</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 divide-y gap-x-rowGap divide-borderColor border-y border-borderColor">
        <div className="flex items-start py-elementSpacing px-cardPadding even:bg-cardColor">
          <div className="flex-grow">
            <h3 className="font-bold text-extra line-clamp-3">
              {cardDataDummy.title}
            </h3>
            <p className="text-meta text-textSecondaryColor">
              {formatRelativeDate(cardDataDummy.createdAt)}
            </p>
          </div>
          <div className="flex gap-x-tagPaddingY">
            <button className="border shadow-sm rounded-small bg-cardColor p-tagPaddingY border-borderColor text-caption">
              <IcBaselineDelete className="text-extra text-textSecondaryColor" />
            </button>
            <button className="border shadow-sm rounded-small bg-cardColor p-tagPaddingY border-borderColor text-caption">
              <IcBaselineDisabledVisible className="text-extra text-textSecondaryColor" />
            </button>
            <button className="border shadow-sm rounded-small bg-cardColor p-tagPaddingY border-borderColor text-caption">
              <IcBaselineEdit className="text-extra text-textSecondaryColor" />
            </button>
          </div>
        </div>
      </div>
      <Pagination
        totalPages={10}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}

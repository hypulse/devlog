"use client";

import Pagination from "@/components/Pagination";
import { Button } from "@/components/inputs";
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
      <Pagination
        totalPages={10}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}

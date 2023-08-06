"use client";

import Pagination from "@/components/Pagination";
import { Button } from "@/components/inputs";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="flex flex-col mx-auto max-w-screen-desktop px-containerPadding space-y-sectionSpacing">
      <div className="flex items-center justify-between">
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <Link href="/admin/articles/post">
          <Button>Post Article</Button>
        </Link>
      </div>
    </main>
  );
}

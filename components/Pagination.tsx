import { useEffect, useState } from "react";
import { IcOutlineArrowCircleLeft, IcOutlineArrowCircleRight } from "./icons";

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const [pages, setPages] = useState<number[]>([]);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setPages(pages);
  }, [totalPages]);

  useEffect(() => {
    if (currentPage > 1) setShowPrev(true);
    else setShowPrev(false);
    if (currentPage < totalPages) setShowNext(true);
    else setShowNext(false);
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center">
      {showPrev && (
        <button
          onClick={handlePrev}
          className="rounded-full p-tagPaddingY hover:bg-borderColor"
        >
          <IcOutlineArrowCircleLeft className="text-extra" />
        </button>
      )}
      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => handlePageChange(page)}
          className={`p-tagPaddingY ${
            page === currentPage
              ? "text-primary underline"
              : "hover:text-primary"
          }`}
        >
          {page}
        </button>
      ))}
      {showNext && (
        <button
          onClick={handleNext}
          className="rounded-full p-tagPaddingY hover:bg-borderColor"
        >
          <IcOutlineArrowCircleRight className="text-extra" />
        </button>
      )}
    </div>
  );
}

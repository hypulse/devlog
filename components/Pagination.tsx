type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({ page, setPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-x-colGap">
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
        &larr; Prev
      </button>
      <span>Page {page}</span>
      <button onClick={() => setPage((prev) => prev + 1)}>Next &rarr;</button>
    </div>
  );
}

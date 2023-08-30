import Button from "./Button";

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({ page, setPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-x-colGap">
      <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
        <RiArrowLeftLine />
      </Button>
      <span>Page {page}</span>
      <Button onClick={() => setPage((prev) => prev + 1)}>
        <RiArrowRightLine />
      </Button>
    </div>
  );
}

function RiArrowLeftLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.828 11H20v2H7.828l5.364 5.364l-1.414 1.414L4 12l7.778-7.778l1.414 1.414L7.828 11Z"
      ></path>
    </svg>
  );
}

function RiArrowRightLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m16.172 11l-5.364-5.364l1.414-1.414L20 12l-7.778 7.778l-1.414-1.414L16.172 13H4v-2h12.172Z"
      ></path>
    </svg>
  );
}

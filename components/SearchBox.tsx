import { useRouter } from "next/router";
import IconButton from "./IconButton";
import Input from "./Input";
import { SVGProps, useRef } from "react";

export default function SearchBox() {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const q = ref.current?.value;
    if (q && q.length >= 2) {
      router.push(`/search?q=${q}`);
    }
  };

  return (
    <form className="flex items-center gap-x-colGap" onSubmit={handleSearch}>
      <Input
        type="text"
        placeholder="Search..."
        className="grow min-w-0"
        ref={ref}
      />
      <IconButton type="submit">
        <RiSearchLine />
      </IconButton>
    </form>
  );
}

function RiSearchLine(props: SVGProps<SVGSVGElement>) {
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
        d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617Zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15Z"
      ></path>
    </svg>
  );
}

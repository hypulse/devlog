"use client";

import { useRouter } from "next/navigation";
import { MdiArrowCollapseUp, MdiLoading, MdiMagnify } from "./icons";
import { InputBase } from "./inputs";

const ScrollToTopButton = () => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <button
        className="rounded-full p-buttonPaddingY bg-cardColor text-secondary animate-bounce"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <MdiArrowCollapseUp />
      </button>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="rounded-full p-buttonPaddingY bg-cardColor text-secondary animate-spin">
        <MdiLoading />
      </div>
    </div>
  );
};

const ShowOnTablet = ({ children }: { children: React.ReactNode }) => {
  return <div className="hidden tablet:block">{children}</div>;
};

const HideOnTablet = ({ children }: { children: React.ReactNode }) => {
  return <div className="tablet:hidden">{children}</div>;
};

const SearchBox = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${e.currentTarget.q.value}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex items-center gap-x-columnGap">
        <InputBase
          name="q"
          type="search"
          className="text-body px-buttonPaddingX py-tagPaddingY bg-bgColor rounded-small"
          placeholder="Search..."
        />
        <button
          className="rounded-full p-tagPaddingY hover:bg-borderColor"
          type="submit"
        >
          <MdiMagnify />
        </button>
      </div>
    </form>
  );
};

export {
  ScrollToTopButton,
  LoadingSpinner,
  ShowOnTablet,
  HideOnTablet,
  SearchBox,
};

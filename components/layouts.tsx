"use client";

import { useRouter } from "next/navigation";
import { MdiMagnify } from "./icons";
import { InputBase } from "./inputs";

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
    e.currentTarget.q.value = "";
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-x-columnGap">
      <InputBase
        name="q"
        type="search"
        className="text-body px-buttonPaddingX py-tagPaddingY bg-bgColor rounded-small"
        placeholder="Search..."
      />
      <button
        className="rounded-full p-tagPaddingY hover:bg-borderColor text-extra"
        type="submit"
      >
        <MdiMagnify />
      </button>
    </form>
  );
};

export { ShowOnTablet, HideOnTablet, SearchBox };

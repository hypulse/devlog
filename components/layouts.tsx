"use client";

import { MdiArrowCollapseUp, MdiLoading, MdiMagnify } from "./icons";
import { InputBase } from "./inputs";

const ScrollToTopButton = () => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <button
        className="rounded-full p-buttonSpacingY bg-cardColor text-secondary animate-bounce"
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
      <div className="rounded-full p-buttonSpacingY bg-cardColor text-secondary animate-spin">
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
  return (
    <div className="flex items-center gap-x-columnGap">
      <InputBase
        type="search"
        className="text-body px-buttonSpacingX py-tagSpacingY bg-bgColor rounded-small"
        placeholder="Search..."
      />
      <button className="rounded-full p-tagSpacingY hover:bg-borderColor">
        <MdiMagnify />
      </button>
    </div>
  );
};

export {
  ScrollToTopButton,
  LoadingSpinner,
  ShowOnTablet,
  HideOnTablet,
  SearchBox,
};

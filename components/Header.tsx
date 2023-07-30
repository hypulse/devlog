"use client";

import useTheme from "@/utils/app/hooks/useTheme";
import { SearchBox, ShowOnTablet } from "./layouts";
import Profile from "./Profile";

const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-tagPaddingY hover:bg-borderColor"
    >
      <div id="i-header-mode" style={{ width: "1em", height: "1em" }} />
    </button>
  );
};

const Header = () => {
  return (
    <>
      <header
        className="fixed top-0 left-0 z-10 w-full border-b border-borderColor bg-cardColor text-extra"
        style={{ height: "3rem" }}
      >
        <div className="flex items-center h-full max-w-6xl mx-auto px-extraSpacing">
          <div className="flex-grow">
            <Profile size={1.875} href="/" />
          </div>
          <div className="flex items-center gap-x-columnGap">
            <ShowOnTablet>
              <SearchBox />
            </ShowOnTablet>
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <div className="mb-sectionSpacing" style={{ height: "3rem" }} />
    </>
  );
};

export default Header;

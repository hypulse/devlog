"use client";

import useTheme from "@/utils/app/hooks/useTheme";
import {
  MaterialSymbolsDarkMode,
  MaterialSymbolsLightMode,
  MdiMagnify,
} from "./icons";
import { InputBase } from "./inputs";
import { ShowOnTablet } from "./layouts";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-tagSpacingY hover:bg-borderColor app-transition"
    >
      <div
        className="relative"
        style={{
          width: "1em",
          height: "1em",
        }}
      >
        <MaterialSymbolsLightMode
          className="absolute top-0 left-0 app-transition"
          style={{
            transform: theme === "light" ? "scale(1)" : "scale(0)",
            opacity: theme === "light" ? 1 : 0,
          }}
        />
        <MaterialSymbolsDarkMode
          className="absolute top-0 left-0 app-transition"
          style={{
            transform: theme === "dark" ? "scale(1)" : "scale(0)",
            opacity: theme === "dark" ? 1 : 0,
          }}
        />
      </div>
    </button>
  );
};

const SearchToggle = () => {
  return (
    <ShowOnTablet>
      <div className="flex items-center gap-x-columnGap">
        <InputBase
          type="search"
          className="text-body px-buttonSpacingX py-tagSpacingY bg-bgColor"
          placeholder="Search..."
        />
        <button className="rounded-full p-tagSpacingY hover:bg-borderColor app-transition">
          <MdiMagnify />
        </button>
      </div>
    </ShowOnTablet>
  );
};

const Header = () => {
  return (
    <header
      className="w-full border-b border-borderColor mb-sectionSpacing bg-cardColor"
      style={{
        height: "3rem",
      }}
    >
      <div className="flex items-center h-full mx-auto max-w-screen-desktop px-containerPadding text-extra">
        <div className="flex-grow"></div>
        <div className="flex items-center gap-x-columnGap">
          <SearchToggle />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;

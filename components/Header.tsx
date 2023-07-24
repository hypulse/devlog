"use client";

import useTheme from "@/utils/app/hooks/useTheme";
import { MaterialSymbolsDarkMode, MaterialSymbolsLightMode } from "./icons";
import { SearchBox, ShowOnTablet } from "./layouts";
import Link from "next/link";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-tagSpacingY hover:bg-borderColor"
    >
      <div
        className="relative"
        style={{
          width: "1em",
          height: "1em",
        }}
      >
        <MaterialSymbolsLightMode
          className="absolute top-0 left-0"
          style={{
            transform: theme === "light" ? "scale(1)" : "scale(0)",
            opacity: theme === "light" ? 1 : 0,
          }}
        />
        <MaterialSymbolsDarkMode
          className="absolute top-0 left-0"
          style={{
            transform: theme === "dark" ? "scale(1)" : "scale(0)",
            opacity: theme === "dark" ? 1 : 0,
          }}
        />
      </div>
    </button>
  );
};

const Header = () => {
  const headerHeight = "3rem";

  return (
    <div className="text-extra">
      <div
        className="mb-sectionSpacing"
        style={{
          height: headerHeight,
        }}
      />
      <header
        className="fixed top-0 left-0 z-10 w-full border-b border-borderColor bg-cardColor"
        style={{
          height: headerHeight,
        }}
      >
        <div className="flex items-center h-full mx-auto max-w-screen-desktop px-containerPadding">
          <div className="flex-grow">
            <Link
              href={`/`}
              className="block overflow-hidden rounded-full"
              style={{
                width: "2rem",
                height: "2rem",
              }}
            >
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage: `url(${"https://avatars.githubusercontent.com/u/90980422?v=4"})`,
                }}
              />
            </Link>
          </div>
          <div className="flex items-center gap-x-columnGap">
            <ShowOnTablet>
              <div className="max-w-xs">
                <SearchBox />
              </div>
            </ShowOnTablet>
            <ThemeSwitcher />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

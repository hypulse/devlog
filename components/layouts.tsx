"use client";

import { useEffect, useState } from "react";
import {
  MaterialSymbolsDarkMode,
  MaterialSymbolsLightMode,
  MdiArrowCollapseUp,
  MdiLoading,
} from "./icons";
import useTheme from "@/utils/app/hooks/useTheme";

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

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        width: "1em",
        height: "1em",
      }}
      className="relative"
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
    </button>
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
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export { ScrollToTopButton, LoadingSpinner, Header };

"use client";

import { useEffect, useState } from "react";

export default function useTheme(): {
  theme: "light" | "dark" | undefined;
  toggleTheme: () => void;
} {
  const [theme, setTheme] = useState<"light" | "dark" | undefined>();

  const applyTheme = (theme: "light" | "dark") => {
    const html = document.querySelector("html");
    if (!html) return;
    html.classList.remove(theme === "light" ? "dark" : "light");
    html.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;
    const localTheme = localStorage.getItem("theme");
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (localTheme) {
      applyTheme(localTheme as "light" | "dark");
      return;
    }

    if (prefersDarkMode) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.querySelector("html");
    if (!html) return;
    const newTheme = html.classList.contains("dark") ? "light" : "dark";
    applyTheme(newTheme);
  };

  return { theme, toggleTheme };
}

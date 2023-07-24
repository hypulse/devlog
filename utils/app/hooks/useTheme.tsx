"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<{
  theme: "light" | "dark" | undefined;
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export default useTheme;
export { ThemeProvider };

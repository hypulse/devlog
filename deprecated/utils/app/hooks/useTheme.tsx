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
  const body = typeof window !== "undefined" && document.querySelector("body");

  useEffect(() => {
    var localStorageTheme = localStorage.getItem("theme");
    var prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (localStorageTheme) {
      setTheme(localStorageTheme as "light" | "dark");
    } else if (prefersDarkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const applyTheme = (theme: "light" | "dark") => {
    if (!body) return;
    body.classList.remove(theme === "light" ? "dark" : "light");
    body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  const toggleTheme = () => {
    if (!body) return;
    const newTheme = body.classList.contains("dark") ? "light" : "dark";
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return useContext(ThemeContext);
};

export default useTheme;
export { ThemeProvider };

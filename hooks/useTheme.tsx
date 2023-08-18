"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeType | undefined;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType | undefined>();

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme") as ThemeType | null;
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(localStorageTheme || (prefersDarkMode ? "dark" : "light"));
  }, []);

  const applyTheme = (theme: ThemeType) => {
    const body = document.querySelector("body");
    if (!body) return;
    body.classList.remove(theme === "light" ? "dark" : "light");
    body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  const toggleTheme = () => {
    if (theme) {
      const newTheme = theme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default useTheme;
export { ThemeProvider };

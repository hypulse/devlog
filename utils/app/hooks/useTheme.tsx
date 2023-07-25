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

const useTheme = () => useContext(ThemeContext);

export default useTheme;
export { ThemeProvider };

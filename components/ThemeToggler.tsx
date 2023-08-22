"use client";

import { RiSunFill, RiMoonCloudyFill } from "@/icons";
import IconButton from "./IconButton";
import useTheme from "@/hooks/useTheme";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      style={{
        transform: theme === "dark" ? "rotate(360deg)" : "rotate(0deg)",
      }}
    >
      {theme === "dark" ? <RiSunFill /> : <RiMoonCloudyFill />}
    </IconButton>
  );
}

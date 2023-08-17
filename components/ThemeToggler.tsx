"use client";

import { RiSunFill, RiMoonFill } from "@/icons";
import IconButton from "./IconButton";
import useTheme from "@/hooks/useTheme";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme}>
      {theme === "dark" ? <RiSunFill /> : <RiMoonFill />}
    </IconButton>
  );
}

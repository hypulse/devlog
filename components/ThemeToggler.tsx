"use client";

import { RiSunFill, RiMoonCloudyFill } from "@/icons";
import IconButton from "./IconButton";
import useTheme from "@/hooks/useTheme";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme}>
      {theme === "dark" ? <RiSunFill /> : <RiMoonCloudyFill />}
    </IconButton>
  );
}

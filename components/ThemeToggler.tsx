import { SVGProps } from "react";
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

function RiMoonCloudyFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.67 5.007a7 7 0 0 1 7.55-3.901a4.5 4.5 0 0 0 5.674 5.674a7.038 7.038 0 0 1-.759 4.593A5.5 5.5 0 0 1 17.5 21H9a8 8 0 0 1-.33-15.993Zm2.177.207a8.016 8.016 0 0 1 5.61 4.885a5.533 5.533 0 0 1 2.96.245a4.97 4.97 0 0 0 .488-1.37a6.502 6.502 0 0 1-5.878-5.88a5.003 5.003 0 0 0-3.18 2.12Z"
      ></path>
    </svg>
  );
}

function RiSunFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05L3.515 4.93ZM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414l-2.121-2.121Zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414l2.121-2.121ZM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414l2.121-2.121ZM23 11v2h-3v-2h3ZM4 11v2H1v-2h3Z"
      ></path>
    </svg>
  );
}

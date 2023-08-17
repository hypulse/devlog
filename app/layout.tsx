import "./globals.css";
import AppRendered from "@/components/AppRendered";
import ThemeToggler from "@/components/ThemeToggler";
import { ThemeProvider } from "@/hooks/useTheme";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
        />
      </head>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
              try {
                var applyTheme = (theme) => {
                  document.body.classList.remove(theme === "light" ? "dark" : "light");
                  document.body.classList.add(theme);
                  localStorage.setItem("theme", theme);
                  setTheme(theme);
                };
                var localStorageTheme = localStorage.getItem("theme");
                var prefersDarkMode =
                  window.matchMedia &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (localStorageTheme) {
                  applyTheme(localStorageTheme);
                } else if (prefersDarkMode) {
                  applyTheme("dark");
                } else {
                  applyTheme("light");
                }
              } catch (e) {}
            })();`,
          }}
        />
        <AppRendered />
        <ThemeProvider>
          <Header />
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto p-containerPadding max-w-screen-desktop">
      {children}
    </main>
  );
};

const Header = () => {
  return (
    <header className="flex items-center max-w-6xl mx-auto p-cardPadding space-x-elementGap mb-sectionGap">
      <h1 className="grow text-h3">
        <Link href="/admin">
          <img
            src="https://avatars.githubusercontent.com/u/90980422?v=4"
            alt="Hypulse"
            className="rounded-full"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
        </Link>
      </h1>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <ThemeToggler />
    </header>
  );
};

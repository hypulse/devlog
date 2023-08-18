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
          <PageLayout>{children}</PageLayout>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto px-containerPadding max-w-screen-desktop">
      {children}
    </main>
  );
};

const Header = () => {
  return (
    <header className="flex items-center max-w-6xl mx-auto p-cardPadding gap-x-elementGap mb-sectionGap">
      <Link href="/admin" className="grow text-h3">
        <img
          src="https://avatars.githubusercontent.com/u/90980422?v=4"
          alt="hypulse"
          className="rounded-full"
          style={{
            width: "2rem",
            height: "2rem",
          }}
        />
      </Link>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <ThemeToggler />
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="flex justify-center text-xs mt-sectionGap p-containerPadding text-textSecondary">
      Copyright &copy; {new Date().getFullYear()} hypulse. All rights reserved.
    </footer>
  );
};

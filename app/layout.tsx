import "./globals.css";
import AppRendered from "@/components/AppRendered";
import ThemeToggler from "@/components/ThemeToggler";

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
        <Header />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto p-cardPadding max-w-screen-desktop">
      {children}
    </main>
  );
};

const Header = () => {
  return (
    <header className="flex items-center max-w-6xl mx-auto p-cardPadding space-x-elementGap mb-sectionGap">
      <h1 className="grow text-h3">Hypulse Log</h1>
      <a>Home</a>
      <a>About</a>
      <ThemeToggler />
    </header>
  );
};

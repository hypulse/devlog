import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
        />
      </Head>
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
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import Header from "@/components/Header";
import "./globals.css";
import { ThemeProvider } from "@/utils/app/hooks/useTheme";

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
            __html: `
                  (function() {
                    try {
                      var theme = localStorage.getItem('theme');
                      if (theme === 'dark')
                        document.body.classList.add('dark');
                      else
                        document.body.classList.remove('dark');
                    } catch (e) {}
                  })();
                `,
          }}
        />
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

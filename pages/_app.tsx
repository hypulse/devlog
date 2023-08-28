import AppRendered from "@/components/AppRendered";
import ThemeToggler from "@/components/ThemeToggler";
import { ThemeProvider } from "@/hooks/useTheme";
import type { AppProps } from "next/app";
import Link from "next/link";
import "@/styles/globals.css";
import "@/styles/markdown-body.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <PageLayout>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </PageLayout>
      <AppRendered />
    </ThemeProvider>
  );
}

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
      <Link href="/snippets">Snippets</Link>
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

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto px-containerPadding max-w-screen-desktop">
      {children}
    </main>
  );
};

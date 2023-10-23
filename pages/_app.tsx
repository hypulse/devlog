import AppRendered from "@/components/AppRendered";
import ThemeToggler from "@/components/ThemeToggler";
import { ThemeProvider } from "@/hooks/useTheme";
import type { AppProps } from "next/app";
import Link from "next/link";
import "@/styles/globals.css";
import "@/styles/markdown-body.scss";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>Hypulse Devlog</title>
        <meta property="og:title" content="Hypulse Devlog" key="title" />
      </Head>
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
    <header className="flex items-center flex-wrap max-w-6xl mx-auto py-cardPadding gap-x-elementGap mb-sectionGap tablet:px-cardPadding">
      <Link href="/" className="grow text-h3">
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
      <Link href="/snippets">Snippets</Link>
      <Link href="/about">About</Link>
      <ThemeToggler />
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="flex justify-center text-xs mt-sectionGap p-containerPadding text-textSecondary">
      <Link href="/admin">
        Copyright &copy; {new Date().getFullYear()} hypulse. All rights
        reserved.
      </Link>
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

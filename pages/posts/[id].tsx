import { GetServerSidePropsContext } from "next";
import MarkedViewer from "@/components/MarkedViewer";
import { PostTypeGet } from "@/types/post";
import sharePost from "@/utils/sharePost";
import fetchAPI from "@/utils/fetchAPI";
import { useEffect, useRef } from "react";
import useTheme from "@/hooks/useTheme";
import Head from "next/head";
import connectToDatabase from "@/server/Migration/connectToDatabase";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  connectToDatabase();

  const postId = context.params?.id;
  if (typeof postId !== "string" || !postId) {
    return { notFound: true };
  }

  const { error, data } = await fetchAPI<PostTypeGet>(
    `${process.env.API_PREFIX}/api/posts/${postId}`
  );
  if (error || !data) {
    return { notFound: true };
  }

  return { props: { data } };
}

export default function Page({ data }: { data: PostTypeGet }) {
  const { title, createdAt, summary, content } = data;
  const titleWithSuffix = `${title} - Hypulse Devlog`;

  return (
    <div className="max-w-sm mx-auto">
      <Head>
        <title>{titleWithSuffix}</title>
        <meta property="og:title" content={titleWithSuffix} key="title" />
      </Head>
      <h1 className="font-bold text-h1">{title}</h1>
      <div className="flex mt-elementGap gap-x-colGap">
        <time
          dateTime={new Date(createdAt).toISOString()}
          suppressHydrationWarning
        >
          {new Date(createdAt).toLocaleString()}
        </time>
        <span>&middot;</span>
        <button
          onClick={() => {
            sharePost(title, summary || "");
          }}
        >
          Share
        </button>
      </div>
      <p className="mt-elementGap text-primary">{summary}</p>
      <MarkedViewer
        text={content || ""}
        className="markdown-body mt-extraGap"
      />
      <Utterances />
    </div>
  );
}

const Utterances = () => {
  const { theme } = useTheme();
  const utterances = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!utterances.current || !document.body.classList.contains("rendered")) {
      return;
    }
    const _utterances = utterances.current;

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "hypulse/devlog-comments");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", `github-${theme}`);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    utterances.current.appendChild(script);

    return () => {
      if (_utterances && _utterances.children && _utterances.children[0]) {
        _utterances.removeChild(_utterances.children[0]);
      }
    };
  }, [utterances, theme]);

  return <div ref={utterances} className="mt-sectionGap" />;
};

import { GetServerSideProps } from "next";
import Marked from "@/components/Marked";
import { PostTypeGet } from "@/types/post";
import copyToClipboard from "@/utils/copyToClipboard";

type PageProps = {
  data: PostTypeGet;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.id;

  if (typeof postId !== "string") {
    return { notFound: true };
  }

  return {
    props: {
      data: {
        title: "title",
        createdAt: new Date().toISOString(),
        summary: "summary",
        content: "content",
      },
    },
  };
};

export default function ({ data }: PageProps) {
  const { title, createdAt, summary, content = "" } = data;
  const createdAtDate = new Date(createdAt);

  const sharePost = async () => {
    const shareData = {
      title,
      text: summary,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }

    copyToClipboard(shareData.url);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-bold text-h1">{title}</h1>
      <div className="flex mt-elementGap gap-x-colGap">
        <time dateTime={createdAtDate.toISOString()}>
          {createdAtDate.toLocaleTimeString()}
        </time>
        <span>&middot;</span>
        <button onClick={sharePost}>Share</button>
      </div>
      <p className="mt-elementGap text-primary">{summary}</p>
      <Marked text={content} className="mt-extraGap" />
    </div>
  );
}

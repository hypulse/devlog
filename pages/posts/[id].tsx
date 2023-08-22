import Marked from "@/components/Marked";
import { PostTypeGet } from "@/types/post";
import { getPost } from "@/utils/apis/posts";
import copyToClipboard from "@/utils/copyToClipboard";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.id;

  if (typeof postId !== "string") {
    return {
      notFound: true,
    };
  }

  const data = await getPost(postId);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

export default function Page({ data }: { data: PostTypeGet }) {
  const { title, createdAt, summary, content } = data;

  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: summary,
          url: window.location.href,
        });
        return;
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
    copyToClipboard(window.location.href);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-bold text-h1">{title}</h1>
      <div className="flex mt-elementGap gap-x-colGap">
        <time dateTime={createdAt.toISOString()}>
          {createdAt.toLocaleTimeString()}
        </time>
        <span>&middot;</span>
        <button onClick={sharePost}>Share</button>
      </div>
      <p className="mt-elementGap text-primary">{summary}</p>
      <Marked text={content || ""} className="mt-extraGap" />
    </div>
  );
}

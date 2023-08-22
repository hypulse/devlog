import Marked from "@/components/Marked";
import { getPost } from "@/utils/apis/posts";
import { PostTypeGet } from "@/types";
import { GetServerSideProps } from "next";

export default function Page({ data }: { data: PostTypeGet }) {
  const { _id, title, createdAt, summary, content } = data;
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-bold text-h1">{title}</h1>
      <div className="flex mt-elementGap gap-x-colGap">
        <time dateTime={createdAt.toISOString()}>
          {createdAt.toLocaleTimeString()}
        </time>
        <span>&middot;</span>
        <button>Share</button>
      </div>
      <p className="mt-elementGap text-primary">{summary}</p>
      <Marked text={content || ""} className="mt-extraGap" />
    </div>
  );
}

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

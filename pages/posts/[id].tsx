import { GetServerSideProps } from "next";
import MarkedViewer from "@/components/MarkedViewer";
import { PostTypeGet } from "@/types/post";
import { getPost } from "@/utils/apis/posts";
import sharePost from "@/utils/sharePost";

type PageProps = {
  data: PostTypeGet;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.id;

  if (typeof postId !== "string" || !postId) {
    return { notFound: true };
  }

  const { error, data } = await getPost(postId);

  if (error || !data) {
    return { notFound: true };
  }

  return { props: { data } };
};

export default function ({ data }: PageProps) {
  const { title, createdAt, summary, content } = data;
  const createdAtDate = new Date(createdAt);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-bold text-h1">{title}</h1>
      <div className="flex mt-elementGap gap-x-colGap">
        <time dateTime={createdAtDate.toISOString()}>
          {createdAtDate.toLocaleString()}
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
    </div>
  );
}

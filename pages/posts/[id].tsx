import { GetServerSidePropsContext } from "next";
import MarkedViewer from "@/components/MarkedViewer";
import { PostTypeGet } from "@/types/post";
import sharePost from "@/utils/sharePost";
import connectToDatabase from "@/server/connectToDatabase";
import fetchAPI from "@/utils/fetchAPI";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await connectToDatabase();

  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const postId = context.params?.id;
  if (typeof postId !== "string" || !postId) {
    return { notFound: true };
  }

  const { error, data } = await fetchAPI<PostTypeGet>(
    `${baseUrl}/api/posts/${postId}`
  );
  if (error || !data) {
    return { notFound: true };
  }

  return { props: { data } };
}

export default function Page({ data }: { data: PostTypeGet }) {
  const { title, createdAt, summary, content } = data;

  return (
    <div className="max-w-2xl mx-auto">
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
    </div>
  );
}

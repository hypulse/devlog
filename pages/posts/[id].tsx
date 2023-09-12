import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import MarkedViewer from "@/components/MarkedViewer";
import { PostTypeGet } from "@/types/post";
import sharePost from "@/utils/sharePost";
import getAllPostIds from "@/server/getAllPostIds";
import connectToDatabase from "@/server/connectToDatabase";
import fetchAPI from "@/utils/fetchAPI";

// export const getStaticPaths: GetStaticPaths = async () => {
//   await connectToDatabase();
//   const posts = await getAllPostIds();

//   const paths = posts.map((postId) => ({
//     params: { id: postId.toString() },
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const postId = context.params?.id;

//   if (typeof postId !== "string" || !postId) {
//     return { notFound: true };
//   }

//   const { error, data } = await fetchAPI<PostTypeGet>(`/posts/${postId}`);

//   if (error || !data) {
//     return { notFound: true };
//   }

//   return { props: { data } };
// };

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const postId = context.params?.id;

  if (typeof postId !== "string" || !postId) {
    return { notFound: true };
  }

  const { error, data } = await fetchAPI<PostTypeGet>(`/posts/${postId}`);

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
        <time dateTime={new Date(createdAt).toISOString()}>
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

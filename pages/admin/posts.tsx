import { ButtonBase } from "@/components/Button";
import Pagination from "@/components/Pagination";
import verifyUser from "@/server/verifyUser";
import { PostState, PostTypeGet } from "@/types/post";
import { getPosts, updatePostState } from "@/utils/apis/posts";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.token;

  try {
    verifyUser(token);
    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
};

export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState<Array<PostTypeGet>>([]);
  const [state, setState] = useState<PostState>("active");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);

  const fetchData = async () => {
    const { error, data, message } = await getPosts(state, page, limit);
    if (error || !data) {
      alert(message);
      return;
    }
    setPosts(data.posts);
    setLastPage(data.lastPage);
  };

  useEffect(() => {
    fetchData();
  }, [state, page, limit]);

  const changeState = async (id: string, state: PostState) => {
    const { error, data, message } = await updatePostState(id, state);
    if (error || !data) {
      alert(message);
      return;
    }
    fetchData();
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/editor?id=${id}`);
  };

  return (
    <div className="space-y-sectionGap">
      <div className="flex items-center justify-between">
        <label className="flex flex-col">
          <span className="text-textSecondary text-caption mb-xsGap">
            State
          </span>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as PostState)}
          >
            <option value="active">Article</option>
            <option value="snippet">Snippet</option>
            <option value="draft">Draft</option>
            <option value="removed">Removed</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-textSecondary text-caption mb-xsGap">
            Limit per page
          </span>
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value, 10))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <table className="min-w-full">
        <thead>
          <tr>
            <TH>Created At</TH>
            <TH>Title</TH>
            <TH>Actions</TH>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <TD>{new Date(post.createdAt).toLocaleString()}</TD>
              <TD>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </TD>
              <TD>
                <div className="flex flex-wrap gap-xsGap">
                  <Button onClick={() => changeState(post.id, "active")}>
                    <RiShareForward2Line />
                    <span>Article</span>
                  </Button>
                  <Button onClick={() => changeState(post.id, "snippet")}>
                    <RiShareForward2Line />
                    <span>Snippet</span>
                  </Button>
                  <Button onClick={() => handleEdit(post.id)}>Editor</Button>
                  <Button onClick={() => changeState(post.id, "removed")}>
                    Delete
                  </Button>
                </div>
              </TD>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={page} setPage={setPage} lastPage={lastPage} />
    </div>
  );
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="p-cellPadding bg-card">{children}</th>
);

const TD = ({ children }: { children: React.ReactNode }) => (
  <td className="p-cellPadding border-t border-border">{children}</td>
);

const Button = (payload: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <ButtonBase
    {...payload}
    className="border border-border flex items-center gap-x-xsGap px-tagPaddingX py-tagPaddingY rounded"
  />
);

function RiShareForward2Line(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4 19h16v-5h2v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-6h2v5ZM16.172 7l-3.95-3.95l1.414-1.414L20 8l-6.364 6.364l-1.414-1.415L16.172 9H5V7h11.172Z"
      ></path>
    </svg>
  );
}

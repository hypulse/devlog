import { ButtonBase } from "@/components/Button";
import Pagination from "@/components/Pagination";
import { PostState, PostTypeGet } from "@/types/post";
import { getPosts, updatePostState } from "@/utils/apis/posts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DefaultButton from "@/components/Button";

export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState<Array<PostTypeGet>>([]);
  const [state, setState] = useState<PostState>("active");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const fetchData = async () => {
    const { error, data, message } = await getPosts(state, page, limit);
    if (error || !data) {
      alert(message);
      return;
    }
    setPosts(data);
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
      <div className="flex justify-between items-center">
        <label className="flex flex-col">
          <span className="text-textSecondary text-caption">State</span>
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
          <span className="text-textSecondary text-caption">
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
            <tr key={post._id}>
              <TD>{new Date(post.createdAt).toLocaleString()}</TD>
              <TD>
                <Link href={`/posts/${post._id}`}>{post.title}</Link>
              </TD>
              <TD>
                <div className="flex flex-wrap gap-xsGap">
                  <Button onClick={() => changeState(post._id, "active")}>
                    <RiShareForward2Line />
                    <span>Article</span>
                  </Button>
                  <Button onClick={() => changeState(post._id, "snippet")}>
                    <RiShareForward2Line />
                    <span>Snippet</span>
                  </Button>
                  <Button onClick={() => handleEdit(post._id)}>Editor</Button>
                  <Button onClick={() => changeState(post._id, "removed")}>
                    Delete
                  </Button>
                </div>
              </TD>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <DefaultButton
          className="bg-primary flex items-center gap-x-xsGap"
          onClick={() => router.push("/admin/editor")}
        >
          <RiEdit2Fill />
          <span>New Post</span>
        </DefaultButton>
      </div>

      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="p-gap bg-card">{children}</th>
);

const TD = ({ children }: { children: React.ReactNode }) => (
  <td className="p-gap border-t border-border">{children}</td>
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

function RiEdit2Fill(props: React.SVGProps<SVGSVGElement>) {
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
        d="M9.243 18.996H21v2H3v-4.242l9.9-9.9l4.242 4.243l-7.9 7.9Zm5.07-13.556l2.122-2.121a1 1 0 0 1 1.414 0l2.829 2.828a1 1 0 0 1 0 1.414l-2.122 2.122l-4.242-4.243Z"
      ></path>
    </svg>
  );
}

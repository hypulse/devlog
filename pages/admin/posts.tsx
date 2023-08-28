import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import { PostState, PostTypeGet } from "@/types/post";
import { getPosts, updatePostState } from "@/utils/apis/posts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
      <div className="flex justify-between">
        <label className="flex items-center gap-x-xsGap">
          <span>State:</span>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as PostState)}
            className="ml-xsGap"
          >
            <option value="active">Article</option>
            <option value="snippet">Snippet</option>
            <option value="draft">Draft</option>
            <option value="removed">Removed</option>
          </select>
        </label>

        <label className="flex items-center gap-x-xsGap">
          <span>Posts per page:</span>
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value, 10))}
            className="ml-xsGap"
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
            <TH>Date</TH>
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
                <div className="flex gap-x-colGap gap-y-rowGap flex-wrap">
                  <Button
                    onClick={() => changeState(post._id, "active")}
                    className="flex gap-x-xsGap items-center"
                  >
                    <RiFolder2Fill />
                    <span>Article</span>
                  </Button>
                  <Button
                    onClick={() => changeState(post._id, "snippet")}
                    className="flex gap-x-xsGap items-center"
                  >
                    <RiFolder2Fill />
                    <span>Snippet</span>
                  </Button>
                  <Button onClick={() => handleEdit(post._id)}>Edit</Button>
                  <Button onClick={() => changeState(post._id, "removed")}>
                    Delete
                  </Button>
                </div>
              </TD>
            </tr>
          ))}
        </tbody>
      </table>

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

function RiFolder2Fill(props: React.SVGProps<SVGSVGElement>) {
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
        d="M22 11v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-9h20Zm0-2H2V4a1 1 0 0 1 1-1h7.414l2 2H21a1 1 0 0 1 1 1v3Z"
      ></path>
    </svg>
  );
}

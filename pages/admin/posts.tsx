import Button from "@/components/Button";
import { PostState, PostTypeGet } from "@/types/post";
import { getPosts, updatePostState } from "@/utils/apis/posts";
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

  const handlePublish = async (id: string) => {
    const { error, data, message } = await updatePostState(id, "active");
    if (error || !data) {
      alert(message);
      return;
    }
    fetchData();
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/editor?id=${id}`);
  };

  const handleDelete = async (id: string) => {
    const { error, data, message } = await updatePostState(id, "removed");
    if (error || !data) {
      alert(message);
      return;
    }
    fetchData();
  };

  return (
    <div className="space-y-extraGap">
      <div className="flex justify-between">
        <label className="flex items-center gap-x-xsGap">
          <span>State:</span>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as PostState)}
            className="ml-xsGap"
          >
            <option value="active">Active</option>
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
              <TD>{post.title}</TD>
              <TD>
                <div className="flex gap-x-colGap gap-y-rowGap flex-wrap">
                  <Button onClick={() => handlePublish(post._id)}>
                    Publish
                  </Button>
                  <Button onClick={() => handleEdit(post._id)}>Edit</Button>
                  <Button onClick={() => handleDelete(post._id)}>Delete</Button>
                </div>
              </TD>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-x-colGap">
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          &larr; Prev
        </Button>
        <span>Page {page}</span>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next &rarr;</Button>
      </div>
    </div>
  );
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="p-gap bg-card">{children}</th>
);

const TD = ({ children }: { children: React.ReactNode }) => (
  <td className="p-gap border-t border-border">{children}</td>
);

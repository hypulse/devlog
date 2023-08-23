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
        <label>
          State:
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

        <label>
          Posts per page:
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

      <table className="min-w-full border-collapse">
        <thead className="bg-card">
          <tr className="text-left">
            <th className="p-xsGap">Date</th>
            <th className="p-xsGap">Title</th>
            <th className="p-xsGap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="even:bg-card">
              <td className="p-xsGap">
                {new Date(post.createdAt).toLocaleString()}
              </td>
              <td className="p-xsGap">{post.title}</td>
              <td className="p-xsGap flex gap-x-colGap">
                <button onClick={() => handlePublish(post._id)}>Publish</button>
                <button onClick={() => handleEdit(post._id)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-x-colGap">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
}

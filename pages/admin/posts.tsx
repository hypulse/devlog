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
    router.push(`/admin/posts/${id}`);
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
    <div>
      <div>
        <label>
          State:
          <select
            value={state}
            onChange={(e) => setState(e.target.value as PostState)}
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="removed">Removed</option>
          </select>
        </label>

        <label>
          Page:
          <input
            type="number"
            value={page}
            onChange={(e) => setPage(parseInt(e.target.value, 10))}
          />
        </label>

        <label>
          Posts per page:
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value, 10))}
          />
        </label>
      </div>

      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <button onClick={() => handlePublish(post._id)}>Publish</button>
          <button onClick={() => handleEdit(post._id)}>Edit</button>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

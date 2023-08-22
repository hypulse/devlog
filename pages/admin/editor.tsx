import { PostState, PostTypePost } from "@/types/post";
import { createPost, getPost, updatePost } from "@/utils/apis/posts";
import parseContent from "@/utils/parseContent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [state, setState] = useState<PostState>("draft");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) {
      fetchPost(id);
    }
  }, []);

  const fetchPost = async (postId: string) => {
    const { error, data } = await getPost(postId);
    if (error || !data) return;
    setMarkdownContent(data.content || "");
    setState(data.state);
  };

  const handleSubmit = async () => {
    const { title, summary, wordCount } = parseContent(markdownContent);

    const updatedPost: PostTypePost = {
      title,
      summary,
      wordCount,
      content: markdownContent,
      state,
    };

    const id = new URLSearchParams(window.location.search).get("id");
    if (id) {
      const { error, message } = await updatePost(id, updatedPost);
      if (error) {
        alert(message);
      } else {
        navigateToPost(id);
      }
    } else {
      const { error, message, data } = await createPost(updatedPost);
      if (error || !data) {
        alert(message);
        return;
      }
      navigateToPost(data._id);
    }
  };

  const navigateToPost = (postId: string) => {
    router.push(`/admin/posts/${postId}`);
  };

  return (
    <div>
      <textarea
        value={markdownContent}
        onChange={(e) => setMarkdownContent(e.target.value)}
        placeholder="Write your markdown content here..."
      />
      <select
        value={state}
        onChange={(e) => setState(e.target.value as PostState)}
      >
        <option value="draft">Draft</option>
        <option value="active">Publish</option>
      </select>
      <button onClick={handleSubmit}>
        {state === "draft" ? "Save Draft" : "Publish"}
      </button>
    </div>
  );
}

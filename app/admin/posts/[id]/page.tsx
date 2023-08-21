import { PostTypePost } from "@/types";
import { createPost, getPost, updatePost } from "@/utils/apis/posts";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const { query, isReady, push } = useRouter();
  const id = query.id as string | undefined;

  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    if (isReady && id) {
      fetchPost(id);
    }
  }, [isReady, id]);

  const fetchPost = async (postId: string) => {
    const fetchedPost = await getPost(postId);
    setMarkdownContent(fetchedPost.content || "");
  };

  const handleSubmit = async () => {
    const updatedPost: PostTypePost = {
      title: "Markdown Post",
      content: markdownContent,
    };

    if (id) {
      await updatePost(id, updatedPost);
      navigateToPost(id);
    } else {
      const response = await createPost(updatedPost);
      navigateToPost(response.data._id);
    }
  };

  const navigateToPost = (postId: string) => {
    push(`/admin/posts/${postId}`);
  };

  return (
    <div>
      <textarea
        value={markdownContent}
        onChange={(e) => setMarkdownContent(e.target.value)}
        placeholder="Write your markdown content here..."
      />
      <button onClick={handleSubmit}>{id ? "Update" : "Create"}</button>
    </div>
  );
}
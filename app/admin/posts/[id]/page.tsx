import { PostState, PostTypePost } from "@/types";
import { createPost, getPost, updatePost } from "@/utils/apis/posts";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const { query, isReady, push } = useRouter();
  const id = query.id as string | undefined;

  const [post, setPost] = useState<PostTypePost>({
    title: "",
    content: "",
    state: "draft",
  });

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const stateRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (isReady && id) {
      fetchPost(id);
    }
  }, [isReady, id]);

  const fetchPost = async (postId: string) => {
    const fetchedPost = await getPost(postId);
    setPost(fetchedPost);
  };

  const handleSubmit = async () => {
    const currentTitle = titleRef.current?.value || "";
    const currentContent = contentRef.current?.value || "";
    const currentState = (stateRef.current?.value as PostState) || "draft";

    const updatedPost = {
      title: currentTitle,
      content: currentContent,
      state: currentState,
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
      <input ref={titleRef} defaultValue={post.title} placeholder="Title" />
      <textarea
        ref={contentRef}
        defaultValue={post.content}
        placeholder="Content"
      />
      <select ref={stateRef} defaultValue={post.state}>
        <option value="draft">Draft</option>
        <option value="active">Publish</option>
      </select>
      <button onClick={handleSubmit}>{id ? "Update" : "Create"}</button>
    </div>
  );
}

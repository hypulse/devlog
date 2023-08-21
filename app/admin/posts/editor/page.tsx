"use client";

import { PostState, PostTypePost } from "@/types";
import { createPost, getPost, updatePost } from "@/utils/apis/posts";
import parseContent from "@/utils/parseContent";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string | null;

  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [state, setState] = useState<PostState>("draft");

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    const fetchedPost = await getPost(postId);
    setMarkdownContent(fetchedPost.content || "");
    setState(fetchedPost.state);
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
      <select
        value={state}
        onChange={(e) => setState(e.target.value as PostState)}
      >
        <option value="draft">Draft</option>
        <option value="active">Publish</option>
      </select>
      <button onClick={handleSubmit}>{id ? "Update" : "Create"}</button>
    </div>
  );
}
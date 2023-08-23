import Button from "@/components/Button";
import { PostState, PostTypePost } from "@/types/post";
import { createPost, getPost, updatePost } from "@/utils/apis/posts";
import parseContent from "@/utils/parseContent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [state, setState] = useState<PostState>("draft");
  const [postId, setPostId] = useState<string | null>(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) {
      setPostId(id);
      fetchPost(id);
    }
  }, [router]);

  const fetchPost = async (postId: string) => {
    const { error, data, message } = await getPost(postId);
    if (error || !data) {
      alert(message);
      return;
    }
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

    const result = postId
      ? await updatePost(postId, updatedPost)
      : await createPost(updatedPost);

    if (result.error || !result.data) {
      alert(result.message);
      return;
    }

    router.push(`/admin/editor?id=${result.data._id}`);
  };

  return (
    <div className="flex flex-col">
      <textarea
        value={markdownContent}
        onChange={(e) => setMarkdownContent(e.target.value)}
        placeholder="Write your markdown content here..."
        className="bg-transparent border rounded outline-none p-inputPadding border-border placeholder-textSecondary mb-elementGap"
        rows={20}
      />
      <div className="mb-xsGap space-x-colGap">
        <label>
          <input
            type="radio"
            value="draft"
            checked={state === "draft"}
            onChange={() => setState("draft")}
          />
          Draft
        </label>
        <label>
          <input
            type="radio"
            value="active"
            checked={state === "active"}
            onChange={() => setState("active")}
          />
          Publish
        </label>
      </div>
      <Button onClick={handleSubmit}>{postId ? "수정" : "생성"}</Button>
    </div>
  );
}

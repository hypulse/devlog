import Button from "@/components/Button";
import { PostState, PostTypePost } from "@/types/post";
import { createPost, getPost, updatePost } from "@/utils/apis/posts";
import parseContent from "@/utils/parseContent";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

export default function Page() {
  const { isReady, query, push } = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [state, setState] = useState<PostState>("draft");
  const [postId, setPostId] = useState<string | null>(null);

  useEffect(() => {
    if (isReady && query.id) {
      const id = query.id as string;
      setPostId(id);
      fetchPost(id);
    }
  }, [isReady, query.id]);

  const fetchPost = async (postId: string) => {
    const { error, data, message } = await getPost(postId);
    if (error || !data) {
      alert(message);
      return;
    }
    if (textareaRef.current) {
      textareaRef.current.value = data.content || "";
    }
    setState(data.state);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string" && textareaRef.current) {
        textareaRef.current.value = reader.result;
      }
    };

    reader.onerror = () => {
      console.error("Error reading the file");
      reader.abort();
    };

    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    const content = textareaRef.current?.value || "";
    const { title, summary, wordCount } = parseContent(content);

    const updatedPost: PostTypePost = {
      title,
      summary,
      wordCount,
      content,
      state,
    };

    const result = postId
      ? await updatePost(postId, updatedPost)
      : await createPost(updatedPost);

    if (result.error || !result.data) {
      alert(result.message);
      return;
    } else {
      alert("Success saving post");
    }

    push(`/admin/editor?id=${result.data._id}`);
  };

  return (
    <div className="flex flex-col gap-y-elementGap">
      <textarea
        ref={textareaRef}
        placeholder="Write your markdown content here..."
        className="bg-transparent border rounded outline-none p-inputPadding border-border placeholder-textSecondary"
        rows={20}
      />
      <input type="file" onChange={handleFileChange}></input>
      <fieldset>
        <legend className="text-caption text-textSecondary mb-xsGap">
          Select state
        </legend>
        <div className="flex space-x-colGap">
          <label className="flex space-x-xsGap">
            <input
              type="radio"
              value="draft"
              checked={state === "draft"}
              onChange={() => setState("draft")}
            />
            <span>Draft</span>
          </label>
          <label className="flex space-x-xsGap items-center">
            <input
              type="radio"
              value="active"
              checked={state === "active"}
              onChange={() => setState("active")}
            />
            <span>Article</span>
          </label>
          <label className="flex space-x-xsGap items-center">
            <input
              type="radio"
              value="snippet"
              checked={state === "snippet"}
              onChange={() => setState("snippet")}
            />
            <span>Snippet</span>
          </label>
        </div>
      </fieldset>
      <Button onClick={handleSubmit} className="bg-primary">
        {postId ? "Update" : "Create"}
      </Button>
    </div>
  );
}

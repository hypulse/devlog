import Button from "@/components/Button";
import verifyUser from "@/server/verifyUser";
import { PostState, PostTypePost } from "@/types/post";
import { createPost, getPost, updatePost } from "@/utils/apis/posts";
import parseContent from "@/utils/parseContent";
import { Marked } from "marked";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.token;

  try {
    verifyUser(token);
    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
};

export default function Page() {
  const { isReady, query, push } = useRouter();
  const [state, setState] = useState<PostState>("draft");
  const [postId, setPostId] = useState<string | null>(null);
  const mdEditor = useRef<MdEditor>(null);

  useEffect(() => {
    if (isReady && query.id) {
      const id = query.id as string;
      setPostId(id);
      fetchPost(id);
    }
  }, [isReady, query.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleTemporarySave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleTemporarySave() {
    const currentTime = new Date().toISOString();

    const newSaveObject = {
      id: currentTime,
      timestamp: currentTime,
      content: getMdValue(),
    };

    const savedPostsString = localStorage.getItem("auto_saved_posts");
    const savedPosts = savedPostsString ? JSON.parse(savedPostsString) : [];

    while (savedPosts.length > 5) {
      savedPosts.shift();
    }

    savedPosts.push(newSaveObject);
    localStorage.setItem("auto_saved_posts", JSON.stringify(savedPosts));

    alert("Temporarily saved at " + currentTime);
  }

  function getMdValue() {
    return mdEditor?.current?.getMdValue() || "";
  }

  function setMdValue(value: string) {
    mdEditor?.current?.setText(value);
  }

  const fetchPost = async (postId: string) => {
    const { error, data, message } = await getPost(postId);
    if (error || !data) {
      alert(message);
      return;
    }
    setMdValue(data.content || "");
    setState(data.state);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setMdValue(reader.result);
      }
    };

    reader.onerror = () => {
      console.error("Error reading the file");
      reader.abort();
    };

    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    const content = getMdValue();
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
      handleTemporarySave();
      return;
    }

    alert("Success saving post");
    push(`/admin/editor?id=${result.data._id}`);
  };

  return (
    <div className="space-y-elementGap">
      <MdEditor
        ref={mdEditor}
        style={{ height: "500px" }}
        renderHTML={(text) => new Marked().parse(text) as string}
      />
      <div className="flex items-center justify-between flex-wrap gap-y-rowGap">
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
        <div>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{
              display: "none",
            }}
          ></input>
          <label
            htmlFor="fileInput"
            className="border border-border flex items-center gap-x-xsGap px-tagPaddingX py-tagPaddingY rounded cursor-pointer"
          >
            파일 선택
          </label>
        </div>
      </div>
      <Button onClick={handleSubmit} className="bg-primary w-full">
        {postId ? "Update" : "Create"}
      </Button>
    </div>
  );
}

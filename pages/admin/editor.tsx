import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import verifyUser from "@/server/verifyUser";
import { PostState, PostTypePost } from "@/types/post";
import { createPost, getPost, updatePost } from "@/utils/apis/posts";
import parseContent from "@/utils/parseContent";
import { Marked } from "marked";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, SVGProps } from "react";
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
  const [showSavedPosts, setShowSavedPosts] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);

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

    window.onbeforeunload = () => {
      return "Are you sure you want to leave? Changes you made may not be saved.";
    };

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.onbeforeunload = null;
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

  function handleShowSavedPosts() {
    const savedPostsString = localStorage.getItem("auto_saved_posts");
    const savedPosts = savedPostsString ? JSON.parse(savedPostsString) : [];
    setSavedPosts(savedPosts);
    setShowSavedPosts(true);
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

  const onImageUpload = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data: any) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex flex-col gap-y-elementGap">
      <div className="flex items-center justify-between">
        <FileInput handleFileChange={handleFileChange} />
        <button
          className="border border-border flex items-center gap-x-xsGap px-tagPaddingX py-tagPaddingY rounded cursor-pointer"
          onClick={handleShowSavedPosts}
        >
          임시저장 글
        </button>
      </div>
      <MdEditor
        ref={mdEditor}
        style={{ height: "500px" }}
        renderHTML={(text) => new Marked().parse(text) as string}
        onImageUpload={onImageUpload}
      />
      <SelectPostState state={state} setState={setState} />
      <Button onClick={handleSubmit} className="bg-primary">
        {postId ? "Update" : "Create"}
      </Button>
      <SavedPosts
        showSavedPosts={showSavedPosts}
        setShowSavedPosts={setShowSavedPosts}
        savedPosts={savedPosts}
        setMdValue={setMdValue}
      />
    </div>
  );
}

const SavedPosts = ({
  showSavedPosts,
  setShowSavedPosts,
  savedPosts,
  setMdValue,
}: any) => {
  const handleChooseSavedPost = (post: any) => {
    setMdValue(post.content);
    setShowSavedPosts(false);
  };

  const handleBackgroundClick = (event: any) => {
    if (event.target === event.currentTarget) {
      setShowSavedPosts(false);
    }
  };

  if (!showSavedPosts) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-background/50 backdrop-blur flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
      <ul className="bg-card rounded py-sectionGap pb-extraGap overflow-y-scroll list-none relative shadow">
        <IconButton
          className="absolute top-cellPadding right-cellPadding"
          onClick={() => setShowSavedPosts(false)}
        >
          <RiCloseFill />
        </IconButton>
        {savedPosts
          .reverse()
          .map((post: { id: string; timestamp: string; content: string }) => (
            <li
              key={post.id}
              onClick={() => {
                handleChooseSavedPost(post);
              }}
              className="px-buttonPaddingX py-buttonPaddingY border-b border-border cursor-pointer last:border-b-0 hover:bg-border"
            >
              {`${new Date(
                post.timestamp
              ).toLocaleString()} - ${post.content.slice(0, 20)}...`}
            </li>
          ))}
      </ul>
    </div>
  );
};

const FileInput = ({ handleFileChange }: any) => {
  return (
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
  );
};

const SelectPostState = ({ state, setState }: any) => {
  return (
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
  );
};

function RiCloseFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m12 10.586l4.95-4.95l1.415 1.415l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.95 4.95l-1.413-1.415l4.95-4.95l-4.95-4.95L7.05 5.638l4.95 4.95Z"
      ></path>
    </svg>
  );
}

"use client";

import { Button, InputBase, Textarea } from "@/components/inputs";
import { CreateArticlePayload } from "@/types/apis";
import articleParser from "@/utils/app/articleParser";
import useSnackBar from "@/utils/app/hooks/useSnackbar";
import { supportedLanguages } from "@/utils/hard";
import { useRef, useState } from "react";

export default function Page() {
  return (
    <main className="flex flex-col mx-auto max-w-screen-desktop px-containerPadding space-y-sectionSpacing">
      <CreateArticle />
      <CreateSnippet />
    </main>
  );
}

const CreateArticle = () => {
  const { showSnackBar } = useSnackBar();
  const [text, setText] = useState<string | ArrayBuffer | null>("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      setText(reader.result);
    };
    if (e.target.files) reader.readAsText(e.target.files[0]);
  };

  const createArticle = async () => {
    const parsedText = await articleParser(text as string);
    if (!parsedText.title) return showSnackBar("Title is required", "error");
    const data: CreateArticlePayload = {
      ...parsedText,
      tags: [],
      type: "article",
      status: status,
    };
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      showSnackBar("Article created successfully", "success");
    } else {
      showSnackBar("Something went wrong", "error");
    }
  };

  return (
    <div className="flex flex-col border gap-y-elementSpacing p-cardPadding bg-cardColor border-borderColor">
      <h2 className="font-bold text-subTitle">Post an article</h2>
      <div className="flex gap-x-columnGap">
        <select
          name="status"
          onChange={(e) => setStatus(e.target.value as "draft" | "published")}
          className="bg-transparent"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <input type="file" onChange={handleFileChange} />
      <div>태그 UI</div>
      <Button onClick={createArticle}>Post</Button>
    </div>
  );
};

const CreateSnippet = () => {
  const { showSnackBar } = useSnackBar();
  const title = useRef<HTMLInputElement>(null);
  const code = useRef<HTMLTextAreaElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const language = useRef<HTMLSelectElement>(null);

  const createSnippet = async () => {
    const markdown = `# ${title.current?.value}\n\n\`\`\`${language.current?.value}\n${code.current?.value}\n\`\`\`\n\n${description.current?.value}`;
    const parsedText = await articleParser(markdown);
    if (!parsedText.title) return showSnackBar("Title is required", "error");
    const data: CreateArticlePayload = {
      ...parsedText,
      tags: [],
      type: "snippet",
      status: "published",
    };
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      showSnackBar("Article created successfully", "success");
    } else {
      showSnackBar("Something went wrong", "error");
    }
  };

  return (
    <div className="flex flex-col border gap-y-elementSpacing p-cardPadding bg-cardColor border-borderColor">
      <h2 className="font-bold text-subTitle">Post a snippet</h2>
      <div className="flex flex-col space-y-rowGap">
        <InputBase
          placeholder="Title"
          className="px-buttonPaddingX py-tagPaddingY bg-bgColor"
          ref={title}
        />
        <select name="language" className="bg-transparent" ref={language}>
          {supportedLanguages.map((lang) => (
            <option value={lang} key={lang}>
              {lang}
            </option>
          ))}
        </select>
        <Textarea
          placeholder="Write your code here"
          className="px-buttonPaddingX py-buttonPaddingY bg-bgColor"
          rows={10}
          ref={code}
        />
        <InputBase
          placeholder="Description of the snippet"
          className="px-buttonPaddingX py-tagPaddingY bg-bgColor"
          ref={description}
        />
      </div>
      <Button onClick={createSnippet}>Post</Button>
    </div>
  );
};

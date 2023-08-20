"use client";

import Button from "@/components/Button";
import { useState } from "react";

export default function Page() {
  const [text, setText] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setText(reader.result);
      }
    };

    reader.onerror = () => {
      console.error("Error reading the file");
      reader.abort();
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-y-elementGap">
      <input type="file" onChange={handleFileChange} />
      <Button>Post</Button>
    </div>
  );
}

import { ArticleSchema } from "@/types/schema";
import { useState } from "react";
import Marked from "./Marked";
import { MdiChevronDown } from "./icons";

const SnippetView = ({
  _id,
  content = "",
  openStart = false,
}: ArticleSchema & {
  openStart?: boolean;
}) => {
  const [open, setOpen] = useState(openStart);

  return (
    <div className="relative">
      <Marked
        className="overflow-hidden border p-elementSpacing border-borderColor bg-cardColor rounded-small"
        content={content}
        style={{
          maxHeight: open ? "100%" : "20rem",
        }}
      />
      <button
        className="absolute left-0 flex justify-center w-full -translate-y-full py-buttonPaddingY text-extra text-textSecondaryColor"
        style={{
          top: open ? "100%" : "20rem",
          background: open ? "transparent" : "",
        }}
        onClick={() => setOpen(!open)}
      >
        <MdiChevronDown
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
    </div>
  );
};

export default SnippetView;

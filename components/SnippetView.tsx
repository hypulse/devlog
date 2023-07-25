import { ArticleSchema } from "@/types/schema";
import { useState } from "react";
import Marked from "./Marked";

const SnippetView = ({
  _id,
  content = "",
  openStart = false,
}: ArticleSchema & {
  openStart?: boolean;
}) => {
  const [open, setOpen] = useState(openStart);

  return (
    <Marked
      className="border p-containerPadding border-borderColor bg-cardColor"
      content={content}
    />
    // <div
    //   className="relative overflow-hidden"
    //   style={{
    //     maxHeight: open ? "100%" : "20rem",
    //   }}
    // >
    //   {/* <Marked
    //       className="border p-containerPadding border-borderColor"
    //       content={content}
    //     />
    //     <button
    //       className="absolute left-0 flex items-center justify-center w-full -translate-y-full border-b gap-x-tagPaddingY text-primary border-borderColor py-buttonPaddingY"
    //       style={{
    //         top: open ? "100%" : "20rem",
    //       }}
    //       onClick={() => setOpen(!open)}
    //     >
    //       <span className="text-meta">{open ? "View Less" : "View More"}</span>
    //       <MdiChevronDown
    //         className="text-extra duration-0"
    //         style={{
    //           transform: open ? "rotate(180deg)" : "rotate(0deg)",
    //         }}
    //       />
    //     </button> */}
    // </div>
  );
};

export default SnippetView;

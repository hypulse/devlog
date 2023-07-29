import { ArticleSchema } from "@/types/schema";
import Marked from "./Marked";
import { MdiShare } from "./icons";
import { shareData } from "@/utils/app/interactiveFeatures";

const SnippetView = ({
  _id,
  title,
  description,
  content = "",
}: ArticleSchema) => {
  const handleShare = () => {
    shareData({
      title,
      text: description || "",
      url: location.origin + "/posts/" + _id,
    });
  };

  return (
    <div className="flex flex-col border p-cardPadding bg-cardColor rounded-small space-y-extraSpacing border-borderColor">
      <Marked content={content} _id={_id} />
      <button
        className="flex items-center justify-center border rounded border-primary text-primary px-buttonPaddingX py-buttonPaddingY"
        onClick={handleShare}
      >
        <MdiShare className="mr-columnGap text-extra" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default SnippetView;

import Marked from "./Marked";
import { BasilShareBoxSolid } from "./icons";
import { shareData } from "@/utils/app/interactiveFeatures";
import useSnackBar from "@/utils/app/hooks/useSnackbar";
import { ArticleData } from "@/types/data";

const SnippetView = ({
  _id,
  title,
  description,
  content = "",
}: ArticleData) => {
  const { showSnackBar } = useSnackBar();

  const handleShare = async () => {
    try {
      const { navigator } = await shareData({
        title,
        text: description || "",
        url: location.origin + "/posts/" + _id,
      });
      navigator
        ? showSnackBar("Shared successfully", "success")
        : showSnackBar("Copied URL to clipboard", "success");
    } catch (err) {
      showSnackBar("Failed to share", "error");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col border p-containerPadding bg-cardColor gap-y-extraSpacing border-borderColor">
      <Marked content={content} _id={_id} />
      <button
        className="flex items-center justify-center border rounded border-primary text-primary px-buttonPaddingX py-buttonPaddingY"
        onClick={handleShare}
      >
        <BasilShareBoxSolid className="mr-columnGap text-extra" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default SnippetView;

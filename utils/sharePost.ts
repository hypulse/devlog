import copyToClipboard from "./copyToClipboard";

const sharePost = async (title: string, summary: string, url?: string) => {
  const shareData = {
    title,
    text: summary,
    url: url || window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }

  copyToClipboard(shareData.url);
  alert("Link copied to clipboard!");
};

export default sharePost;

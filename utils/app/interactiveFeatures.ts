async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (err) {
      console.error("Failed to copy with navigator.clipboard:", err);
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Failed to copy with execCommand:", err);
  } finally {
    document.body.removeChild(textArea);
  }
}

type ModifiedShareData = Omit<ShareData, "files"> & {
  title: string;
  text: string;
  url: string;
};

async function shareData(data: ModifiedShareData): Promise<void> {
  if (navigator.share) {
    try {
      await navigator.share(data);
      console.log("Data shared successfully");
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  } else {
    await copyToClipboard(data.url);
  }
}

export { copyToClipboard, shareData };

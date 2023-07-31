function copyToClipboard(text: string): Promise<void> {
  return new Promise((resolve) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    resolve();
  });
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

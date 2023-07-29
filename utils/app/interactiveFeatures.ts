async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  } else {
    // Fallback for browsers that do not support the Clipboard API
    let textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; //avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      let successful = document.execCommand("copy");
      let msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

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

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

async function shareData(data: ModifiedShareData): Promise<{
  navigator: boolean;
}> {
  if (navigator.share) {
    await navigator.share(data);
    return { navigator: true };
  } else {
    await copyToClipboard(data.url);
    return { navigator: false };
  }
}

export { copyToClipboard, shareData };

type Options = {
  width?: number;
  quality?: number;
};

export default async function adjustImageQuality(
  dataURL: string,
  options?: Options
): Promise<string> {
  const { width, quality } = options || {};
  const img = new Image();
  img.src = dataURL;
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");
  return new Promise((resolve) => {
    img.onload = () => {
      canvas.width = width || img.width;
      canvas.height = width ? (width / img.width) * img.height : img.height;
      canvasContext?.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
  });
}

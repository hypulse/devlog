export function estimateReadingTime(wordCount: number = 0): string {
  const wordsPerMinute = 265;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  if (minutes <= 1) return "1 min read";
  return `${minutes} min read`;
}

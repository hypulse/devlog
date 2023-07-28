const getEstimatedReadTime = (words: number = 0): string => {
  const wpm = 265;
  const seconds = Math.ceil(words / wpm) * 60;
  if (seconds < 60) {
    return `${seconds} sec read`;
  } else if (seconds < 120) {
    return "1 min read";
  } else {
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} min read`;
  }
};

const formatRelativeDate = (date: Date = new Date()) => {
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const yearDiff = now.getFullYear() - date.getFullYear();
  if (yearDiff > 0) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } else if (dayDiff >= 7) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else if (dayDiff > 0) {
    return `${dayDiff} day${dayDiff === 1 ? "" : "s"} ago`;
  } else if (timeDiff < 60 * 60 * 1000) {
    const minDiff = Math.floor(timeDiff / (1000 * 60));
    return `${minDiff} minute${minDiff === 1 ? "" : "s"} ago`;
  } else if (timeDiff < 24 * 60 * 60 * 1000) {
    const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    return `${hourDiff} hour${hourDiff === 1 ? "" : "s"} ago`;
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
};

export { getEstimatedReadTime, formatRelativeDate };

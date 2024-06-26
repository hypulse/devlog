export default function timeSince(inputDate: Date = new Date()): string {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - inputDate.getTime();

  const secondsDiff = diffInMilliseconds / 1000;
  const minutesDiff = secondsDiff / 60;
  const hoursDiff = minutesDiff / 60;
  const daysDiff = Math.floor(hoursDiff / 24);

  if (daysDiff > 365) {
    return inputDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  if (daysDiff >= 7) {
    return inputDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  if (daysDiff >= 1) {
    return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
  }

  if (hoursDiff >= 1) {
    return `${Math.floor(hoursDiff)} hour${hoursDiff >= 2 ? "s" : ""} ago`;
  }

  if (minutesDiff >= 1) {
    return `${Math.floor(minutesDiff)} minute${
      minutesDiff >= 2 ? "s" : ""
    } ago`;
  }

  return "just now";
}

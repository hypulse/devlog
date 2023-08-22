import { PostTypeGet } from "@/types/post";
import { estimateReadingTime } from "@/utils/estimateReadingTime";
import timeSince from "@/utils/timeSince";
import Link from "next/link";

export default function Card({
  _id,
  title,
  summary,
  createdAt,
  wordCount,
}: PostTypeGet) {
  return (
    <div className="flex flex-col gap-y-rowGap group">
      <Link href={`/posts/${_id}`}>
        <h2 className="font-bold text-h2 group-hover:text-primary">{title}</h2>
      </Link>
      <p className="flex text-caption gap-x-colGap">
        <span>{timeSince(createdAt)}</span>
        <span>&middot;</span>
        <span>{estimateReadingTime(wordCount)}</span>
        <span>&middot;</span>
        <Link href={`/admin/editor?id=${_id}`}>
          <span className="text-textSecondary">edit</span>
        </Link>
      </p>
      <p className="line-clamp-3">{summary}</p>
    </div>
  );
}

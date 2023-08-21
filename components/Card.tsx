import Link from "next/link";

export default function Card({ _id }: { _id: string }) {
  return (
    <div className="flex flex-col gap-y-rowGap group">
      <Link href={`/posts/${_id}`}>
        <h2 className="font-bold text-h2 group-hover:text-primary">
          Target sales suffer after Pride month backlash
        </h2>
      </Link>
      <p className="flex text-caption gap-x-colGap">
        <span>10 hours ago</span>
        <span>&middot;</span>
        <span>3 mins read</span>
        <span>&middot;</span>
        <Link href={`/admin/editor?id=${_id}`}>
          <span className="text-textSecondary">edit</span>
        </Link>
      </p>
      <p className="line-clamp-3">
        US retail giant Target saw sales fall in-store and online for the first
        time in years after a backlash over its Pride Month offering. Sales
        dropped 5% in the April to June period compared with the same time last
        year - its first fall in six years.
      </p>
    </div>
  );
}

import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col mx-auto max-w-screen-desktop px-containerPadding">
      <div className="flex flex-col gap-y-rowGap">
        {[
          {
            title: "Manage Articles",
            href: "/admin/articles",
          },
          {
            title: "Manage Tags",
            href: "/admin/tags",
          },
          {
            title: "Manage Backups",
            href: "/admin/backups",
          },
        ].map(({ title, href }) => (
          <Link
            key={title}
            href={href}
            className="flex items-center border rounded p-buttonPaddingX border-borderColor bg-cardColor"
          >
            <div className="grow">{title}</div>
            <span className="text-meta text-textSecondaryColor">{href}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}

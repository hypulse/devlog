import Link from "next/link";

const SmallCard = ({
  _id,
  title,
  thumbnailImage,
}: {
  _id: string;
  title: string;
  thumbnailImage?: string;
}) => {
  return (
    <Link
      href={`/posts/${_id}`}
      className="flex items-start border p-cardPadding bg-cardColor border-borderColor rounded-small group gap-x-elementSpacing"
    >
      <div className="overflow-hidden rounded aspect-video basis-1/3 grow">
        <div
          className="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${
              thumbnailImage || "/images/placeholder.png"
            })`,
          }}
        />
      </div>
      <h2 className="font-bold text-extra group-hover:text-primary grow basis-2/3 line-clamp-3">
        {title}
      </h2>
    </Link>
  );
};

export default SmallCard;

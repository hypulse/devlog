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
      className="flex items-start border p-cardPadding bg-cardColor border-borderColor rounded-small group space-x-elementSpacing"
    >
      <div className="overflow-hidden rounded aspect-video basis-1/3">
        <div
          className="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${
              thumbnailImage || "/images/placeholder.png"
            })`,
          }}
        />
      </div>
      <h3 className="font-bold text-extra group-hover:text-primary basis-2/3 line-clamp-3">
        {title}
      </h3>
    </Link>
  );
};

export default SmallCard;

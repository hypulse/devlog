import Link from "next/link";

const SmallCard = ({
  _id,
  title,
  thumbnailImage,
  className,
}: {
  _id: string;
  title: string;
  thumbnailImage?: string;
  className?: string;
}) => {
  return (
    <Link
      href={`/posts/${_id}`}
      className={
        className
          ? `flex items-start group space-x-elementSpacing ${className}`
          : "flex items-start group space-x-elementSpacing"
      }
    >
      <div
        className="overflow-hidden rounded aspect-video shrink-0"
        style={{
          flexBasis: "8rem",
        }}
      >
        <div
          className="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${
              thumbnailImage || "/images/placeholder.png"
            })`,
          }}
        />
      </div>
      <h3 className="flex-grow font-bold text-extra group-hover:text-primary line-clamp-3">
        {title}
      </h3>
    </Link>
  );
};

export default SmallCard;

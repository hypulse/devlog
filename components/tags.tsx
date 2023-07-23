import { TagSchema } from "@/types/schema";
import Link from "next/link";

const Tag = ({ _id, name }: TagSchema) => {
  return (
    <Link href={`/posts?tag=${_id}`}>
      <div className="border rounded px-tagSpacingX py-tagSpacingY border-borderColor text-meta text-secondary">
        {name.toLocaleLowerCase()}
      </div>
    </Link>
  );
};

const TagWrapper = ({ tags }: { tags: Array<TagSchema> }) => {
  return (
    <div className="flex flex-wrap items-center -m-tagSpacingY">
      {tags.map((tag) => (
        <div key={tag._id} className="m-tagSpacingY">
          <Tag {...tag} />
        </div>
      ))}
    </div>
  );
};

export { Tag, TagWrapper };

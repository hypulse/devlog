import { TagData } from "@/types/data";
import conditionalClassName from "@/utils/app/conditionalClassName";
import Link from "next/link";
import { ButtonHTMLAttributes, InputHTMLAttributes, forwardRef } from "react";

const InputBase = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={conditionalClassName(
        "block w-full border-0 outline-none placeholder-textSecondaryColor ring-1 ring-inset ring-borderColor focus:ring-2 focus:ring-primary/50 focus:ring-inset",
        className
      )}
      {...props}
    />
  );
});

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={conditionalClassName(
        "rounded px-buttonPaddingX py-buttonPaddingY focus:outline-none focus:ring-4 focus:ring-primary/50 ring-offset-transparent bg-primary shadow-sm",
        className
      )}
      {...props}
    />
  );
});

const Tag = ({ _id, name }: TagData) => {
  return (
    <Link key={_id} href={`/search?tag=${_id}`} className="m-tagPaddingY">
      <div className="inline-flex items-center border rounded-full px-tagPaddingX py-tagPaddingY text-caption border-borderColor text-primary bg-cardColor">
        {name.toLocaleLowerCase()}
      </div>
    </Link>
  );
};

const Tags = ({ tags }: { tags: Array<TagData> }) => {
  return (
    <div className="flex flex-wrap items-center">
      <div className="flex flex-wrap items-center justify-center -m-tagPaddingY">
        {tags.map(({ _id, name }) => (
          <Tag _id={_id} name={name} />
        ))}
      </div>
    </div>
  );
};

export { InputBase, Button, Tag, Tags };

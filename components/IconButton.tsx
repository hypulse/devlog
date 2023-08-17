import { mergeClasses } from "@/utils";

export default function IconButton({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={mergeClasses(
        className,
        "rounded-full p-inputPadding hover:bg-border"
      )}
      {...props}
    ></button>
  );
}

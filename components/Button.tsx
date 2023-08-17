import { mergeClasses } from "@/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={mergeClasses(
        className,
        "px-buttonPaddingX py-buttonPaddingY rounded bg-primary text-white"
      )}
      {...props}
    />
  );
});

export default Button;

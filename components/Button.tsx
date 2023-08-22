import mergeClasses from "@/utils/mergeClasses";
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
        "px-buttonPaddingX py-buttonPaddingY rounded bg-primary outline-none"
      )}
      {...props}
    />
  );
});

export default Button;

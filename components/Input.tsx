import mergeClasses from "@/utils/mergeClasses";
import { InputHTMLAttributes, forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={mergeClasses(
        className,
        "bg-transparent border rounded outline-none p-inputPadding border-border placeholder-textSecondary"
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export default Input;

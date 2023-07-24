import { InputHTMLAttributes, forwardRef } from "react";

const InputBase = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`block w-full border-0 outline-none placeholder-textSecondaryColor ring-1 ring-inset ring-borderColor focus:ring-2 focus:ring-primary focus:ring-inset ${className}`}
      {...props}
    />
  );
});

export { InputBase };

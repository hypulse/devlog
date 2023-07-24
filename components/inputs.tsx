import { InputHTMLAttributes } from "react";

const InputBase = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`block w-full border-0 outline-none placeholder-textSecondaryColor ring-1 ring-inset ring-borderColor focus:ring-2 focus:ring-primary focus:ring-inset ${className}`}
      {...props}
    />
  );
};

export { InputBase };

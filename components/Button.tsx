import mergeClasses from "@/utils/mergeClasses";
import { ButtonHTMLAttributes, forwardRef } from "react";

const ButtonBase = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  return <button ref={ref} {...props} />;
});

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={mergeClasses(
        className,
        "px-buttonPaddingX py-buttonPaddingY rounded outline-none"
      )}
      {...props}
    />
  );
});
ButtonBase.displayName = "ButtonBase";

export default Button;
export { ButtonBase };

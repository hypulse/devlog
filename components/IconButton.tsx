// const Button = forwardRef<
//   HTMLButtonElement,
//   ButtonHTMLAttributes<HTMLButtonElement>
// >(({ className, type, ...props }, ref) => {
//   return (
//     <button
//       ref={ref}
//       type="button"
//       className={conditionalClassName(
//         "rounded px-buttonPaddingX py-buttonPaddingY focus:outline-none focus:ring-4 focus:ring-primary/50 ring-offset-transparent bg-primary shadow-sm",
//         className
//       )}
//       {...props}
//     />
//   );
// });

export default function IconButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-full p-inputPadding hover:bg-border">
      {children}
    </div>
  );
}

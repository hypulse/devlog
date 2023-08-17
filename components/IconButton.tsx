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

export default function IconButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="rounded-full p-inputPadding hover:bg-border"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

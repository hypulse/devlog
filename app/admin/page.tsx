import Button from "@/components/Button";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-elementGap">
      <input
        type="text"
        className="bg-transparent border rounded outline-none p-inputPadding border-border focus:ring-2 placeholder-textSecondary"
        placeholder="email"
      ></input>
      <input
        type="text"
        className="bg-transparent border rounded outline-none p-inputPadding border-border focus:ring-2"
        placeholder="password"
      ></input>
      <Button>Login</Button>
    </div>
  );
} // focus:outline-none focus:ring-4 focus:ring-primary/50 ring-offset-transparent bg-primary shadow-sm

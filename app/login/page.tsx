import Button from "@/components/Button";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-elementGap">
      <input
        type="text"
        className="bg-transparent border rounded outline-none p-inputPadding border-border placeholder-textSecondary"
        placeholder="email"
      ></input>
      <input
        type="text"
        className="bg-transparent border rounded outline-none p-inputPadding border-border placeholder-textSecondary"
        placeholder="password"
      ></input>
      <Button>Login</Button>
    </div>
  );
}

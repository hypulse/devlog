import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-elementGap">
      <Input type="text" placeholder="email" />
      <Input type="text" placeholder="password" />
      <Button>Login</Button>
    </div>
  );
}

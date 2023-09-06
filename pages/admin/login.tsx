import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Page() {
  return (
    <div className="flex flex-col">
      <Input type="text" placeholder="email" className="mb-elementGap" />
      <Input type="text" placeholder="password" className="mb-elementGap" />
      <Button className="bg-primary mb-rowGap">
        <span>Sign in</span>
      </Button>
    </div>
  );
}

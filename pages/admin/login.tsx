import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-elementGap">
      <Input type="text" placeholder="email" />
      <Input type="text" placeholder="password" />
      <Button className="bg-primary flex items-center gap-x-xsGap justify-center">
        <RiLoginBoxLine />
        <span>Login</span>
      </Button>
    </div>
  );
}

function RiLoginBoxLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm6-4V8l5 4l-5 4v-3H2v-2h8Z"
      ></path>
    </svg>
  );
}

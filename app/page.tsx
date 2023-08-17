import Card from "@/components/Card";
import { RiArrowUpFill, RiLoaderFill } from "@/icons";

export default function Page() {
  return (
    <div className="flex-col space-y-extraGap">
      <Card />
      <Card />
      <Loader />
    </div>
  );
}

const Loader = () => {
  return (
    <div className="p-inputPadding">
      <RiLoaderFill />
      <RiArrowUpFill />
    </div>
  );
};

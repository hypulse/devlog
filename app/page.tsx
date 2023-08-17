import Card from "@/components/Card";
import { RiArrowUpFill, RiLoaderLine } from "@/icons";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-extraGap">
      <Card />
      <Card />
      <div className="flex justify-center">
        <Loader />
      </div>
    </div>
  );
}

const Loader = ({ loading = true }) => {
  return (
    <div className="rounded-full p-inputPadding bg-border text-primary">
      {loading ? <RiLoaderLine /> : <RiArrowUpFill />}
    </div>
  );
};

import Card from "@/components/Card";
import SearchBox from "@/components/SearchBox";

export default function Page() {
  return (
    <div className="space-y-sectionGap">
      <SearchBox />
      <div className="flex flex-col gap-y-extraGap">
        <Card _id="1" />
        <Card _id="2" />
      </div>
    </div>
  );
}

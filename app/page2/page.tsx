import CardComponent from "@/components/cardComponent";
import TextContent from "@/components/TextContent";

export default function Course() {
  return (
    <div className="w-full overflow-x-hidden pb-12 md:pb-20">
      <div className="mx-auto w-full max-w-[1568px]">
        <TextContent />
        <CardComponent />
      </div>
    </div>
  );
}
import Side from "@/components/UI/Side";
import { TDL } from "@/components/lists/TDL";
export default function page() {
  return (
    <div className="flex flex-col md:flex-row justify-around min-h-full gap-4">
      <Side>
        <TDL />
      </Side>
      <Side>
        <p>placeholder for completed tasks</p>
      </Side>
    </div>
  );
}

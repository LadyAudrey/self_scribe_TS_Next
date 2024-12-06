import { Lists } from "./Lists";
import AddList from "./AddList";

export async function TDL() {
  return (
    <div className="flex flex-col">
      <div className="text-2xl">To Do List</div>
      <Lists />
      <AddList />
    </div>
  );
}

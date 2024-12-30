import { Tasks } from "../tasks/Tasks";
import { Lists } from "@/app/dashboard/lists/page";

type ListsProps = {
  toDoLists: Lists;
};

export async function CompletedPane({ toDoLists }: ListsProps) {
  return (
    <ul>
      {toDoLists.map((list) => {
        return (
          <li key={list.listId} className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <div>{list.name}</div>
            </div>
            <div className="flex flex-col gap-2 ps-4">
              <Tasks tasks={list.tasks} completed={true} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

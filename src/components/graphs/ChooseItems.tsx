import { DisplayTasks } from "./DisplayTasks";
import { DisplaySymptoms } from "./DisplaySymptoms";

export function ChooseItems() {
  return (
    <div>
      <h3>Choose which tasks and symptoms you'd like to graph</h3>
      {/* a header and a component for tasks */}
      <h4>Select tasks:</h4>
      <DisplayTasks />
      {/* a header and a component for tasks */}
      <h4>Select symptoms:</h4>
      <DisplaySymptoms />
    </div>
  );
}

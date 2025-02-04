import { auth } from "@/auth";
// import { db } from "@/db";
// import { eq, desc } from "drizzle-orm";

import Side from "@/components/UI/Side";
// import { SymptomsPane } from "@/components/symptoms/SymptomsPane";
// const mockSymptomInstances = [
//   {
//     id: 1,
//     symptom_id: 27,
//     created_on: "2024-01-29 08:32:56.916733-08",
//     intensity: 1,
//     notes: "",
//   },
//   {
//     id: 1,
//     symptom_id: 28,
//     created_on: "2024-01-29 08:32:56.916733-08",
//     intensity: 1,
//     notes: "",
//   },
// ];

export default async function page() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  // const userId = session.user.id!;
  return (
    <div className="flex flex-col md:flex-row justify-around min-h-full gap-4">
      <Side>
        <div className="flex flex-col">
          <div className="text-2xl">All Symptoms</div>
        </div>
      </Side>
      <Side>
        <div className="flex flex-col">
          <div className="text-2xl">Today&apos;s Symptoms</div>
        </div>
      </Side>
    </div>
  );
}

import { auth } from "@/auth";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";

import Side from "@/components/UI/Side";
import { symptomsTable } from "@/db/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { Checkbox } from "@/components/tasks/Checkbox";
import AddSymptomForm from "@/components/symptoms/AddSymptomForm";
// import { SymptomsPane } from "@/components/symptoms/SymptomsPane";

export const SYMPTOM_CATEGORIES = [
  "Digestion",
  "Sleep",
  "Energy Levels",
  "Cognition",
  "Pain",
];

export default async function page() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;
  const symptomLists = await compileSymptoms(userId);

  return (
    <div>
      <div>
        {/* <AddSymptomForm /> */}
        {/* TODO: having weird db call. copy in logic from lists, expand to take in 3 items */}
        {/* <Accordion type={"single"} collapsible>
          <AccordionItem value={"ddfaa"}>
            <AccordionTrigger className="flex grow justify-between items-center gap-2">
              New Symptom
            </AccordionTrigger>
            <AccordionContent className="flex justify-between">
              <AddSymptomForm />
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
      </div>
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
    </div>
  );
}

async function compileSymptoms(userId: string) {
  const symptomLists = await db
    .select()
    .from(symptomsTable)
    .where(eq(symptomsTable.userId, userId))
    .orderBy(symptomsTable.createdOn);
  return symptomLists;
}

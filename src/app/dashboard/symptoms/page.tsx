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
import { revalidatePath } from "next/cache";
import { Description } from "@headlessui/react";
import { SymptomsPane } from "@/components/symptoms/SymptomsPane";
// import { SymptomsPane } from "@/components/symptoms/SymptomsPane";

export default async function page() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;
  const symptomLists = await compileSymptoms(userId);

  async function addSymptom(
    _prevState: { message: string },
    formData: FormData
  ) {
    "use server";
    const name = formData.get("name") as string | null;
    if (!name) {
      return { message: "Failed to create list" };
    }
    const description = formData.get("description") as string | null;
    try {
      await db.insert(symptomsTable).values({ name, userId, description });
      revalidatePath("/dashboard/symptoms");
      return { message: "" };
    } catch (error) {
      console.error(error);
      return { message: "Failed to create symptom" };
    }
  }

  return (
    <div>
      <div>
        {/* TODO: having weird db call. copy in logic from lists, expand to take in 3 items */}
        <Accordion type={"single"} collapsible>
          <AccordionItem value={"ddfaa"}>
            <AccordionTrigger className="flex grow justify-between items-center gap-2">
              New Symptom
            </AccordionTrigger>
            <AccordionContent className="flex justify-between">
              <AddSymptomForm addSymptom={addSymptom} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col md:flex-row justify-around min-h-full gap-4">
        <SymptomsPane symptoms={symptomLists} />
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

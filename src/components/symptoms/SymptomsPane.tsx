import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { eq } from "drizzle-orm";

import { symptomInstancesTable, symptomsTable } from "@/db/schema";
import Side from "../UI/Side";
import { DeleteBtn } from "../UI/DeleteBtn";
import { Checkbox } from "@headlessui/react";

import { RepeatBtn } from "../lists/RepeatBtn";
import { EditItem } from "@/components/UI/EditItem";
import { TaskFrequency } from "../tasks/TaskFrequency";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../UI/Accordion";
import { Textarea } from "../UI/Textarea";
import SymptomDescription from "./SymptomDescription";

type SymptomsPaneProps = {
  symptoms: (typeof symptomsTable.$inferSelect)[];
};
export async function SymptomsPane({ symptoms }: SymptomsPaneProps) {
  return (
    <Side>
      <div className="flex flex-col">
        <div className="text-2xl">All Symptoms</div>
        <ul>
          {symptoms.map((symptom) => {
            async function deleteSymptom() {
              "use server";
              await db
                .delete(symptomsTable)
                .where(eq(symptomsTable.symptomId, symptom.symptomId));
              revalidatePath("/dashboard/symptoms");
            }
            async function updateSymptom(title: string) {
              "use server";
              await db
                .update(symptomsTable)
                .set({ name: title })
                .where(eq(symptomsTable.symptomId, symptom.symptomId));
              revalidatePath("/dashboard/symptoms");
            }
            async function addSymptomInstance() {
              "use server";
              await db.insert(symptomInstancesTable).values({
                symptomId: symptom.symptomId,
                userId: symptom.userId,
                severity: 0,
              });
              revalidatePath("/dashboard/symptoms");
            }
            async function updateSymptomDescription(description: string) {
              "use server";
              await db
                .update(symptomsTable)
                .set({
                  description: description,
                })
                .where(eq(symptomsTable.symptomId, symptom.symptomId));
              revalidatePath("/dashboard/symptoms");
            }
            return (
              <li key={symptom.symptomId}>
                <Accordion type={"single"} collapsible>
                  <AccordionItem value={symptom.symptomId}>
                    <AccordionTrigger className="flex grow justify-between items-center gap-2">
                      <button
                        onClick={addSymptomInstance}
                        className="text-white"
                      >
                        Add
                      </button>
                      <EditItem
                        name={symptom.name}
                        updateItem={updateSymptom}
                        className="grow"
                      />

                      <DeleteBtn
                        deleteFn={deleteSymptom}
                        confirmationTxt="Are you sure you want to delete this symptom? All of your instances will be permanently removed. This action cannot be undone."
                        modalTitle="Delete Symptom"
                        className="ms-5"
                      />
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-between text-black">
                      {/* TODO: categories - combo-box (action-rendering =>) from shad cn (https://ui.shadcn.com/docs/components/combobox)*/}
                      {/* description - text */}
                      <SymptomDescription
                        description={symptom.description ?? ""}
                        updateDescription={updateSymptomDescription}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            );
          })}
        </ul>
      </div>
    </Side>
  );
}

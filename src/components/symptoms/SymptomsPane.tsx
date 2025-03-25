import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { eq } from "drizzle-orm";

import { symptomsTable } from "@/db/schema";
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
              revalidatePath("/dashboard/lists");
            }
            // TODO: generate and migrate, hook up select to db
            return (
              <li key={symptom.symptomId}>
                <Accordion type={"single"} collapsible>
                  <AccordionItem value={symptom.symptomId}>
                    <AccordionTrigger className="flex grow justify-between items-center gap-2">
                      <EditItem
                        name={symptom.name}
                        updateItem={updateSymptom}
                        className="grow"
                      />
                      <label htmlFor="severity-select">Severity:</label>
                      <select id="severity-select" className="text-black">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      <DeleteBtn
                        deleteFn={deleteSymptom}
                        confirmationTxt="Are you sure you want to delete this symptom? All of your instances will be permanently removed. This action cannot be undone."
                        modalTitle="Delete Symptom"
                        className="ms-5"
                      />
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-between text-black">
                      {/* categories - multisect*/}
                      {/* description - text */}
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

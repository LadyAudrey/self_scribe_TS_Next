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
import { SymptomCategories } from "./SymptomCategories";

type TodaysSymptomsPaneProps = {
  symptoms: (typeof symptomsTable.$inferSelect)[];
  categories: string[];
};

export function TodaysSymptomsPane({
  symptoms,
  categories,
}: TodaysSymptomsPaneProps) {
  console.log(symptoms, "we are the symptoms");
  return (
    <Side>
      <div className="flex flex-col">
        <div className="text-2xl">Today&apos;s Symptoms</div>
        {/* TODO: create UI on right to display symptomInstances */}
        {symptoms.map((symptom) => {
          // figure out how to access instances correctly
          if (symptom.instances.length == 0) {
            return null;
          }
          return (
            <div>
              <h3>{symptom.name}</h3>
              <ul key={symptom.symptomId}>
                {symptom.instances.map((instance) => {
                  console.log(instance.createdOn);
                  return (
                    <li className="text-white flex gap-10">
                      {/* TODO: install select */}
                      <p>{instance.severity}</p>
                      <p>{instance.createdOn.toString()}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </Side>
  );
}

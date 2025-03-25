"use client";

import { useActionState, useState } from "react";
import { SYMPTOM_CATEGORIES } from "@/app/dashboard/symptoms/symptomsCategories";
import { useFormStatus } from "react-dom";

type AddSymptomFormProps = {
  addSymptom: (
    prevState: {
      message: string;
    },
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
};

export default function AddSymptomForm({ addSymptom }: AddSymptomFormProps) {
  const [state, formAction] = useActionState(addSymptom, { message: "" });

  return (
    <form action={formAction} className="text-black">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" />
      <label htmlFor="description">Description</label>
      <input type="textarea" name="description" />
      <select>
        <option value="">None</option>
        {SYMPTOM_CATEGORIES.map((category) => {
          return (
            <option value={category} key={category}>
              {category}
            </option>
          );
        })}
      </select>
      <SubmitButton />
      {state.message !== "" && <p>{state.message}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="text-white"
    >
      Add Symptom
    </button>
  );
}

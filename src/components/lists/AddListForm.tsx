"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type AddListFormProps = {
  addList: (
    prevState: {
      message: string;
    },
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
};

export function AddListForm({ addList }: AddListFormProps) {
  const [state, formAction] = useActionState(addList, { message: "" });
  return (
    <form action={formAction} className="flex gap-2 py-4">
      <input
        type="text"
        id="name"
        required
        name="name"
        className="text-black"
      />
      <SubmitButton />
      {state.message !== "" && <p>{state.message}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      Add List
    </button>
  );
}

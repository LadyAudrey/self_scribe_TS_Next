"use client";

import { useState } from "react";
import { Textarea } from "../UI/Textarea";

type SymptomDescriptionProps = {
  description: string;
  updateDescription: (description: string) => Promise<void>;
};
export default function SymptomDescription({
  description,
  updateDescription,
}: SymptomDescriptionProps) {
  const [text, setText] = useState(description);
  return (
    <div className="text-white">
      <Textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      {text !== description && (
        <button
          onClick={() => {
            updateDescription(text);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
}

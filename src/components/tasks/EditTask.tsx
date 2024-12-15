"use client";
import { useState } from "react";

type EditTaskProps = {
  name: string;
  updateTask: (title: string) => void;
};

export function EditTask({ name, updateTask }: EditTaskProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(name);
  function onDblClick() {
    setEditing(true);
  }
  function onBlur() {
    if (title !== name) {
      updateTask(title);
    }
    setEditing(false);
  }

  function onEnterKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }
    if (title !== name) {
      updateTask(title);
    }
    setEditing(false);
  }
  return (
    <div onDoubleClick={onDblClick} onBlur={onBlur} onKeyDown={onEnterKey}>
      {editing && (
        <input
          className="text-black"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      )}
      {!editing && title}
    </div>
  );
}

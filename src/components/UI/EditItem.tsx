"use client";
import { useState } from "react";

type EditItemProps = {
  name: string;
  updateItem: (title: string) => void;
  className?: string;
};

export function EditItem({ name, updateItem, className }: EditItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(name);
  function onDblClick() {
    setEditing(true);
  }
  function onBlur() {
    if (title !== name) {
      updateItem(title);
    }
    setEditing(false);
  }

  function onEnterKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }
    if (title !== name) {
      updateItem(title);
    }
    setEditing(false);
  }

  return (
    <div
      onDoubleClick={onDblClick}
      onBlur={onBlur}
      onKeyDown={onEnterKey}
      className={className}
    >
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

"use client";

import { useState } from "react";
import { SYMPTOM_CATEGORIES } from "@/app/dashboard/symptoms/page";

export default function AddSymptomForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  function onSubmit() {}
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <label htmlFor="description">Description</label>
      <input
        type="textarea"
        name="description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <select
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
        }}
      >
        <option value="">None</option>
        {SYMPTOM_CATEGORIES.map((category) => {
          return <option value={category}>{category}</option>;
        })}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

"use client";

import { useState } from "react";

import { cn } from "@/components/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/UI/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";

type CategoryComboboxProps = {
  allCategories: string[];
  symptomCategories: string[];
};
export function CategoryCombobox({
  allCategories,
  symptomCategories,
}: CategoryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const symptomCategoriesSet = new Set(symptomCategories);
  const allCategoriesSet = new Set(allCategories);
  const categories = allCategoriesSet.difference(symptomCategoriesSet);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          +{/* need an SVG for a visual */}
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-black w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search categories..." className="h-9" />
          <CommandList>
            {/* TODO: create logic to create new categories from input */}
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {Array.from(categories).map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {category}
                  {/* use svg checkmark if applicable */}
                  {/* <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

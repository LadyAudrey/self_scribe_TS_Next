import { Checkbox as HeadlessCheckbox } from "@headlessui/react";
import checkmark from "public/buttons/check.svg";
import Image from "next/image";

type CheckboxProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <HeadlessCheckbox checked={checked} onChange={onChange}>
      <Image src={checkmark} height={16} width={16} alt={"checkmark"} />
    </HeadlessCheckbox>
  );
}

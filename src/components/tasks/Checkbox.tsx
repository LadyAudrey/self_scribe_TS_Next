import { Checkbox as HeadlessCheckbox } from "@headlessui/react";
import Checkmark from "../../../public/buttons/check.svg";
import Image from "next/image";

type CheckboxProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    // TODO: restrict spamming issues
    <HeadlessCheckbox
      checked={checked}
      onChange={onChange}
      className="border size-4 group text-white block rounded bg-white data-[checked]:bg-blue-500"
    >
      <Image
        src={Checkmark}
        height={20}
        width={20}
        alt="checkmark"
        className="opacity-0 group-data-[checked]:opacity-100 m-auto"
      />
    </HeadlessCheckbox>
  );
}

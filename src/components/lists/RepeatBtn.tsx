"use client";

import Image from "next/image";
import RepeatsIcon from "../../../public/buttons/repeat.svg";
import { useState } from "react";

type RepeatBtnProps = {
  repeats: boolean;
  updateRepeats: (repeats: boolean) => Promise<void>;
};

export function RepeatBtn({ repeats, updateRepeats }: RepeatBtnProps) {
  const [disabled, setDisabled] = useState(false);
  return (
    <button
      disabled={disabled}
      className={repeats ? " opacity-100" : " opacity-50"}
      onClick={async () => {
        setDisabled(true);
        await updateRepeats(!repeats);
        setDisabled(false);
      }}
    >
      <Image
        src={RepeatsIcon}
        height={16}
        width={16}
        className={"size-5"}
        alt="repeats"
      />
    </button>
  );
}

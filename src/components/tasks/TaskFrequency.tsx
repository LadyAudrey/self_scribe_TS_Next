"use client";
import { useState } from "react";

type TaskFrequencyProps = {
  active: number;
  inactive: number;
  updateFrequency: (active: number, inactive: number) => Promise<void>;
};

export function TaskFrequency({
  active,
  inactive,
  updateFrequency,
}: TaskFrequencyProps) {
  const [activeDays, setActiveDays] = useState(active);
  const [inactiveDays, setInactiveDays] = useState(inactive);
  const [hasChanged, setHasChanged] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="flex gap-2">
      {hasChanged && (
        <>
          <button
            disabled={disabled}
            onClick={async () => {
              setActiveDays(active);
              setInactiveDays(inactive);
              setHasChanged(false);
            }}
            className="bg-exit-btn bg-cover w-5 h-5"
          />
          <button
            disabled={disabled}
            onClick={async () => {
              setDisabled(true);
              await updateFrequency(activeDays, inactiveDays);
              setDisabled(false);
              setHasChanged(false);
            }}
            className="bg-completed-btn stroke-green-400 bg-cover w-5 h-5"
          />
        </>
      )}
      <input
        type="number"
        name="active"
        className="w-8"
        min={0}
        max={30}
        value={activeDays}
        onChange={(event) => {
          if (isNaN(parseInt(event.target.value))) {
            setActiveDays(1);
            return;
          }
          setHasChanged(true);
          setActiveDays(parseInt(event.target.value));
        }}
      />
      <input
        type="number"
        name="inactive"
        className="w-8"
        min={0}
        max={99}
        value={inactiveDays}
        onChange={(event) => {
          if (isNaN(parseInt(event.target.value))) {
            setInactiveDays(1);
            return;
          }
          setHasChanged(true);
          3;
          setInactiveDays(parseInt(event.target.value));
        }}
      />
    </div>
  );
}

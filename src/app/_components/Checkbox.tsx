import React, { Dispatch, SetStateAction } from "react";

type Props = {
  label: String;
  value: boolean | undefined;
  onChange: (name: String) => void;
};
export default function Checkbox({ label, value, onChange }: Props) {
  return (
    <div>
      <label>
        <input
          type="radio"
          className="checkbox-round bg-blue-600 rounded"
          checked={value}
          onChange={() => onChange(label)}
        />
        {label}
      </label>
    </div>
  );
}

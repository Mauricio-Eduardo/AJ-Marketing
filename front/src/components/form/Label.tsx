import { LabelHTMLAttributes } from "react";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className="text-sm font-medium flex items-center justify-between"
      {...props}
    />
  );
}

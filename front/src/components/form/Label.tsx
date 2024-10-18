import { LabelHTMLAttributes } from "react";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { children, ...rest } = props;

  const invisibleText = "\u200B";

  return (
    <label
      className="text-sm font-medium flex items-center justify-between"
      {...rest}
    >
      {children || invisibleText}
    </label>
  );
}

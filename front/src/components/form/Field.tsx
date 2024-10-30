import { HTMLAttributes } from "react";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export function Field({ className = "", ...props }: FieldProps) {
  return <div className={`flex flex-col gap-1 ${className}`} {...props} />;
}

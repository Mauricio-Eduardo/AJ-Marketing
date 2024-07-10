import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import inputMask, { MaskTypes } from "./inputMask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  width?: number;
  max?: number;
  disabled?: boolean;
  maskType?: MaskTypes;
}

export function Input({
  name,
  width,
  max,
  disabled,
  maskType,
  onChange,
  ...rest
}: InputProps) {
  const { register } = useFormContext();

  const style = {
    width: width ? `${width}px` : undefined,
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;

    // Se o tipo do input for 'number' e max estiver definido, aplicamos a validação de dígitos
    if (rest.type === "number" && max) {
      // Limitar a quantidade de dígitos
      const value = input.value.replace(/\D/g, ""); // Remove não dígitos
      if (value.length > max) {
        input.value = value.slice(0, max);
      }
    }

    // Remover valores negativos
    if (parseInt(input.value) < 0) {
      input.value = "0";
    }

    if (maskType) {
      const mask = inputMask[maskType];
      event.currentTarget.value = mask(event);
    }

    if (typeof onChange === "function") {
      onChange(event);
    }
  }

  return (
    <input
      id={name}
      maxLength={max}
      className={`${
        disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
      } h-8 pl-2 pr-2 rounded border border-zinc-300 hover:border-violet-600 focus:ring-2 focus:outline-violet-700 shadow-sm text-zinc-800`}
      style={style}
      disabled={disabled}
      {...register(name)}
      {...rest}
      onChange={handleChange}
    />
  );
}

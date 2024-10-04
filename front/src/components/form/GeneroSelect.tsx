import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface GeneroSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  disabled: boolean;
}

// export function AtivoSelect({ name, disabled }: AtivoSelectProps) {
export const GeneroSelect: React.FC<GeneroSelectProps> = ({
  control,
  name,
  disabled,
}) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <div className="flex flex-col space-y-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`${
          disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
        } h-8 pl-2 pr-2 uppercase rounded border border-zinc-300 hover:border-violet-600 focus:ring-2 focus:outline-violet-700 shadow-sm text-zinc-800`}
      >
        <option value=""></option>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="outro">Outro</option>
      </select>
    </div>
  );
};

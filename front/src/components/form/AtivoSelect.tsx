import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface AtivoSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  disabled: boolean;
}

export const AtivoSelect: React.FC<AtivoSelectProps> = ({
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
        value={value ? "true" : "false"}
        onChange={(e) => onChange(e.target.value === "true")}
        disabled={disabled}
        className={`${
          disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
        } h-8 pl-2 pr-2 uppercase rounded border border-zinc-300 hover:border-violet-600 focus:ring-2 focus:outline-violet-700 shadow-sm text-zinc-800`}
      >
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
    </div>
  );
};

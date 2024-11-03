import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface TipoPessoaSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  disabled: boolean;
  handlePessoaChange: () => void;
}

export const TipoPessoaSelect: React.FC<TipoPessoaSelectProps> = ({
  control,
  name,
  disabled,
  handlePessoaChange,
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
        onChange={(e) => {
          onChange(e.target.value), handlePessoaChange();
        }}
        disabled={disabled}
        className={`${
          disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
        } h-8 pl-2 pr-2 rounded border border-zinc-300 hover:border-violet-600 focus:ring-2 focus:outline-violet-700 shadow-sm text-zinc-800`}
      >
        <option value="Física">Física</option>
        <option value="Jurídica">Jurídica</option>
      </select>
    </div>
  );
};

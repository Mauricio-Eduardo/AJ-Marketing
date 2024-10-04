import { InputHTMLAttributes, useEffect, useState } from "react";
import { Control, Controller, useController, useForm } from "react-hook-form";
import { PeridiocidadesController } from "../../controllers/peridiocidades-controller";
import { Peridiocidade } from "../../models/peridiocidade/entity/Peridiocidade";

interface PeridiocidadesSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  disabled: boolean;
}

export const PeridiocidadesSelect: React.FC<PeridiocidadesSelectProps> = ({
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

  const { register } = useForm();

  const controller = new PeridiocidadesController();
  const [options, setOptions] = useState<Peridiocidade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await controller.getAllAtivos();
        setOptions(response);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`${
            disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
          } h-8 pl-2 pr-2 uppercase rounded border border-zinc-300 hover:border-violet-600 focus:ring-2 focus:outline-violet-700 shadow-sm text-zinc-800`}
        >
          <option value="">Selecione uma opção</option>
          {options && options.length > 0 ? (
            options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.descricao} {/* Exibindo a descrição */}
              </option>
            ))
          ) : (
            <option disabled>Nenhuma opção disponível</option>
          )}
        </select>
      )}
    </div>
  );
};

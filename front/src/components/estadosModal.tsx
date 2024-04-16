import { FloppyDisk, Pencil, Plus, Trash } from "@phosphor-icons/react";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

interface IPaisProps {
  pais_ID: number;
  pais: string;
}

interface IEstadosProps {
  estado_ID: number;
  pais_ID: number;
  estado: string;
  uf: string;
}

interface IModalProps {
  tableProps?: IEstadosProps;
  title: string;
  color?: string;
}

export function EstadosModal({ tableProps, title, color }: IModalProps) {
  const [formData, setFormData] = useState<IEstadosProps>({
    estado_ID: 0,
    pais_ID: 0,
    estado: "",
    uf: "",
  });

  // usado para puxar os PAISES no <Select />
  const [paises, setPaises] = useState<IPaisProps[]>([]);
  const [, setSelectedPais] = useState<number | null>(null);

  // Função para buscar os países da API
  const getAllPaises = async () => {
    try {
      const response = await axios.get<IPaisProps[]>(
        "https://localhost:7179/api/Paises/getAllPaises"
      );
      const paisesData = response.data; // Supondo que a resposta contenha um array de países
      setPaises(paisesData);
    } catch (error) {
      console.error("Erro ao buscar paises:", error);
    }
  };

  useEffect(() => {
    // Chamada à função de busca de países quando o componente é montado
    getAllPaises();
  }, []); // A lista vazia como segundo argumento faz com que o useEffect seja executado apenas uma vez, após o montagem do componente

  const handleChange = (field: string | number, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // const handleSelectChange = (newValue: string | null) => {
  //   // Converter o valor de string de volta para número
  //   const numericValue = newValue ? parseInt(newValue) : 0;
  //   setSelectedPais(numericValue);
  // };

  const limparDialog = () => {
    // Limpar o formulário após o sucesso da requisição
    setFormData({
      estado_ID: 0,
      pais_ID: 0,
      estado: "",
      uf: "",
    });
    setSelectedPais(0); // Aqui limpa o Select
  };

  const handleSave = () => {
    console.log("Dados a serem enviados:", formData);
    // Verifica se os campos obrigatórios estão preenchidos
    if (formData.estado && formData.pais_ID && formData.uf) {
      axios
        .post("https://localhost:7179/api/Estados/postEstado", formData)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpar o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao salvar o Estado:", error);
        });
    } else {
      console.error("Campos obrigatórios não preenchidos");
    }
  };

  return (
    <div className="mb-4">
      <Dialog.Root onOpenChange={limparDialog}>
        {/* insere os ícones de acordo com o title do botao */}
        {title === "Novo Estado" && (
          <Dialog.Trigger>
            <Button style={{ backgroundColor: color }}>
              <Plus />
              {title}
            </Button>
          </Dialog.Trigger>
        )}

        {title === "Editar" && (
          <Dialog.Trigger>
            <Button style={{ backgroundColor: color }}>
              <Pencil />
              {title}
            </Button>
          </Dialog.Trigger>
        )}

        {title === "Excluir" && (
          <Dialog.Trigger>
            <Button style={{ backgroundColor: color }}>
              <Trash />
              {title}
            </Button>
          </Dialog.Trigger>
        )}

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>{title}</Dialog.Title>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Código
            </Text>
            <TextField.Root
              value={tableProps?.estado_ID}
              placeholder="0"
              className="w-20"
              disabled={true}
            />
          </label>
          <Flex direction="row" gap="3" wrap={"wrap"}>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Estado
              </Text>
              <TextField.Root
                value={tableProps?.estado}
                onChange={(e) => handleChange("estado", e.target.value)}
                placeholder="Insira o nome do Estado"
                className="w-48"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                País
              </Text>
              <Select.Root
                onValueChange={(newValue) => {
                  const numericValue = newValue ? parseInt(newValue) : 0; // Converte o valor para número
                  handleChange("pais_ID", numericValue); // Atualiza o campo 'pais_ID' no formData
                }}
                defaultValue=""
              >
                <Select.Trigger />
                <Select.Content>
                  {paises.map((pais) => (
                    <Select.Item
                      key={pais.pais_ID}
                      value={String(pais.pais_ID)}
                    >
                      {pais.pais}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </label>

            <div className="w-36">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  UF
                </Text>
                <TextField.Root
                  value={tableProps?.uf}
                  onChange={(e) => handleChange("uf", e.target.value)}
                  placeholder="Insira a UF"
                  className="w-24"
                />
              </label>
            </div>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>

            {title === "Excluir" && (
              <Dialog.Close>
                <Button color="red" onClick={handleSave}>
                  Excluir
                </Button>
              </Dialog.Close>
            )}
            {title != "Excluir" && (
              <Dialog.Close>
                <Button onClick={handleSave}>
                  <FloppyDisk />
                  Salvar
                </Button>
              </Dialog.Close>
            )}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

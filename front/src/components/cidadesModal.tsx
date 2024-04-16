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

interface IEstadosProps {
  estado_ID: number;
  pais_ID: number;
  estado: string;
  uf: string;
}

interface ICidadesProps {
  cidade_ID: number;
  estado_ID: number;
  cidade: string;
  ddd: string;
}

interface IModalProps {
  tableProps?: ICidadesProps;
  title: string;
  color?: string;
}

export function CidadesModal({ tableProps, title, color }: IModalProps) {
  const [formData, setFormData] = useState<ICidadesProps>({
    cidade_ID: 0,
    estado_ID: 0,
    cidade: "",
    ddd: "",
  });

  // usado para puxar os ESTADOS no <Select />
  const [estados, setEstados] = useState<IEstadosProps[]>([]);
  const [, setSelectedEstado] = useState<number | null>(null);

  // Função para buscar os estados da API
  const getAllEstados = async () => {
    try {
      const response = await axios.get<IEstadosProps[]>(
        "https://localhost:7179/api/Estados/getAllEstados"
      );
      const estadosData = response.data; // Supondo que a resposta contenha um array de países
      setEstados(estadosData);
    } catch (error) {
      console.error("Erro ao buscar estados:", error);
    }
  };

  useEffect(() => {
    // Chamada à função de busca de estados quando o componente é montado
    getAllEstados();
  }, []); // A lista vazia como segundo argumento faz com que o useEffect seja executado apenas uma vez, após o montagem do componente

  const limparDialog = () => {
    // Limpar o formulário após o sucesso da requisição
    setFormData({
      cidade_ID: 0,
      estado_ID: 0,
      cidade: "",
      ddd: "",
    });
    setSelectedEstado(0); // Aqui limpa o Select
  };

  // FUNÇÃO QUE É CHAMADA SEMPRE QUE TEM UMA ALTERAÇÃO EM ALGUM INPUT, ELA SETA O VALOR DO INPUT NA VARIAVEL formData
  const handleChange = (field: string | number, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // FUNÇÃO PARA SALVAR
  const handleSave = () => {
    console.log("Dados a serem enviados:", formData);
    // Verifica se os campos obrigatórios estão preenchidos
    if (formData.cidade && formData.estado_ID && formData.ddd) {
      axios
        .post("https://localhost:7179/api/Cidades/postCidade", formData)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpar o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao salvar a Cidade:", error);
        });
    } else {
      console.error("Campos obrigatórios não preenchidos");
    }
  };

  // FUNÇÃO PARA EDITAR
  const handleEdit = () => {
    console.log("Dados a serem alterados:", formData);
    // Verifica se os campos obrigatórios estão preenchidos
    if (formData.cidade && formData.estado_ID && formData.ddd) {
      axios
        .post("https://localhost:7179/api/Cidades/putCidade", formData)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpar o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao editar a Cidade:", error);
        });
    } else {
      console.error("Campos obrigatórios não preenchidos");
    }
  };

  return (
    <div className="mb-4">
      <Dialog.Root onOpenChange={limparDialog}>
        {/* insere os ícones de acordo com o title do botao */}
        {title === "Nova Cidade" && (
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
              defaultValue={tableProps?.cidade_ID || "0"}
              placeholder="0"
              className="w-20"
              disabled={true}
            />
          </label>
          <Flex direction="row" gap="3" wrap={"wrap"}>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Cidade
              </Text>
              <TextField.Root
                defaultValue={tableProps?.cidade}
                onChange={(e) => handleChange("cidade", e.target.value)}
                placeholder="Insira o nome da Cidade"
                className="w-48"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Estado
              </Text>
              <Select.Root
                onValueChange={(newValue) => {
                  const numericValue = newValue ? parseInt(newValue) : 0; // Converte o valor para número
                  handleChange("estado_ID", numericValue); // Atualiza o campo 'pais_ID' no formData
                }}
                defaultValue=""
              >
                <Select.Trigger />
                <Select.Content>
                  {estados.map((estado) => (
                    <Select.Item
                      key={estado.estado_ID}
                      value={String(estado.estado_ID)}
                    >
                      {estado.estado}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </label>

            <div className="w-36">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  DDD
                </Text>
                <TextField.Root
                  defaultValue={tableProps?.ddd}
                  onChange={(e) => handleChange("ddd", e.target.value)}
                  placeholder="Insira o DDD"
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
            {title === "Editar" && (
              <Dialog.Close>
                <Button onClick={handleEdit}>
                  <FloppyDisk />
                  Salvar
                </Button>
              </Dialog.Close>
            )}
            {title != "Editar" && title != "Excluir" && (
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

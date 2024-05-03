import { useEffect, useState } from "react";
import { format } from "date-fns";
import { api } from "../../config/api";

import { Cidades } from "../DataTable/CidadesDataTable";
import { Estados } from "../DataTable/EstadosDataTable";

import { FloppyDisk, Pencil, Plus, Trash } from "@phosphor-icons/react";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";

type ModalProps = {
  data: Cidades;
};

export function CidadesModal({ data }: ModalProps) {
  // Varíavel que vai armazenar os dados e ser usada para as requisições para a API
  const [formData, setFormData] = useState<Cidades>(data);

  // Atualiza os valores em 'formData' conforme é alterado na Modal
  const handleChange = (field: string, value: string | boolean | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Altera o titulo da Modal - Cadastrar / Editar / Excluir -
  const [title, setTitle] = useState<string>("");
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  // Indica se a Modal vai ser editável ou não (Só é editável quando for 'Cadastrar' ou 'Editar')
  const [disabled, setDisabled] = useState<boolean>(false);
  const handleDisabledChange = (status: boolean) => {
    setDisabled(status);
  };

  // Função que limpa todos os campos da Modal (Utilizado quando é para cadastro)
  const limparDialog = () => {
    // Limpar o formulário após o sucesso da requisição
    setFormData({
      cidade_ID: 0,
      cidade: "",
      estado_ID: 0,
      ddd: "",
      estado: "",
      ativo: true,
      data_cadastro: "",
      data_ult_alt: "",
    });
    setSelectedEstado(0); // Aqui limpa o Select
  };

  // Verifica se todos os campos obrigatórios do estado estão preenchidos
  function verificaCampos(data: Cidades): boolean {
    // Os campos de data não são necessários, a API cuida disso
    // O campo 'ddd' não é obrigatório
    // O campo 'ativo' não precisa verificar porque sempre vai ter valor (true ou false)
    if (data.cidade != "" && data.estado_ID) return true;
    return false;
  }

  /// Faz a requisição Post na API para incluir um estado
  const handleSave = () => {
    // Retira o 'cidade_ID', 'estado', 'data_cadastro' e 'data_ult_alt' do 'formData' porque não são necessários para a requisição
    const { cidade_ID, estado, data_cadastro, data_ult_alt, ...rest } =
      formData;

    if (verificaCampos(formData)) {
      api
        .post("Cidades/postCidade", rest)
        .then((response) => {
          console.log("Resposta da API:", response.data);

          // Limpa o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao salvar a Cidade:", error);
        });
    } else {
      console.error("Dados insuficientes!", rest);
    }
  };

  // Faz a requisição Post na API para editar um estado
  const handleEdit = () => {
    // Retira o 'estado', 'data_cadastro' e 'data_ult_alt' do 'formData' porque não são necessários para a requisição
    const { estado, data_cadastro, data_ult_alt, ...rest } = formData;

    if (verificaCampos(formData)) {
      api
        .put("Cidades/putCidade", rest)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpar o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao editar a Cidade:", error);
        });
    } else {
      console.error("Os campos não foram validados, verifique!", rest);
    }
  };

  // Faz a requisição Post na API para deletar/inativar um país
  const handleDelete = () => {
    // Não precisa verificar todos os campos, é necessário somente o 'cidade_ID' para exlcuir/inativar um registro
    if (formData.cidade_ID) {
      api
        .delete(`Cidades/deleteCidade/${formData.cidade_ID}`)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpa o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao excluir a Cidade:", error);
          if (error.response && error.response.status === 500) {
            console.error(
              "Cidade não pode ser deletada pois está sendo utilizada. Ela será inativada!"
            );
            // Aqui inativa o registro
            inativaCidade();
          }
        });
    } else {
      console.error("Dados insuficientes!");
    }
  };

  // Faz a requisição Post na API para inativar um país quando ele não puder ser excluído
  const inativaCidade = () => {
    // Retira o 'estado', 'data_cadastro' e 'data_ult_alt' do 'formData' porque não são necessários para a requisição
    const { estado, data_cadastro, data_ult_alt, ...rest } = formData;
    // Seta o 'ativo' como false, para inativar
    rest.ativo = false;

    if (verificaCampos(formData)) {
      api
        .put("Cidades/putCidade", rest)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpar o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao inativar a Cidade:", error);
        });
    } else {
      console.error("Os campos não foram validados, verifique!", rest);
    }
  };

  // Função para buscar os estados da API
  const getAllEstadosAtivos = async () => {
    try {
      const response = await api.get<Estados[]>("Estados/getAllEstadosAtivos");
      const estadosData = response.data; // Supondo que a resposta contenha um array de países
      setEstados(estadosData); // Aqui seta os estados para escolha no <Select/>
    } catch (error) {
      console.error("Erro ao buscar estados:", error);
    }
  };

  // Usado para puxar os ESTADOS no <Select />
  const [estados, setEstados] = useState<Estados[]>([]);
  const [, setSelectedEstado] = useState<number | null>(null);

  // Aqui chama o getAllEstados() para setar os estados como valores no <Select/>
  useEffect(() => {
    getAllEstadosAtivos();
  }, []); // A lista vazia como segundo argumento faz com que o useEffect seja executado apenas uma vez, após o montagem do componente

  // Render
  return (
    <div className="mb-2">
      {/* <pre>{JSON.stringify(formData)}</pre> */}
      <Dialog.Root>
        {/* Action buttons */}
        <Flex gap={"3"}>
          <Dialog.Trigger>
            <Button
              onClick={() => {
                limparDialog();
                handleTitleChange("Cadastrar");
                handleDisabledChange(false);
              }}
            >
              <Plus />
              Cadastrar
            </Button>
          </Dialog.Trigger>

          <Dialog.Trigger>
            <Button
              onClick={() => {
                handleTitleChange("Editar");
                handleDisabledChange(false);
                setFormData(data);
              }}
            >
              <Pencil />
              Editar
            </Button>
          </Dialog.Trigger>

          <Dialog.Trigger>
            <Button
              style={{ backgroundColor: "red" }}
              onClick={() => {
                handleTitleChange("Excluir");
                handleDisabledChange(true);
                setFormData(data);
              }}
            >
              <Trash />
              Excluir
            </Button>
          </Dialog.Trigger>
        </Flex>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>{title}</Dialog.Title>

          {/* CÓDIGO */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Código
            </Text>
            <TextField.Root
              value={formData.cidade_ID}
              placeholder="0"
              className="w-20"
              disabled={true}
            />
          </label>

          <Flex direction="row" gap="3" wrap={"wrap"}>
            {/* CIDADE */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Cidade
              </Text>
              <TextField.Root
                defaultValue={formData.cidade}
                onChange={(e) => handleChange("cidade", e.target.value)}
                placeholder="Insira o nome da Cidade"
                className="w-48"
                disabled={disabled}
              />
            </label>

            {/* ESTADO */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Estado
              </Text>
              <Select.Root
                onValueChange={(newValue) => {
                  const numericValue = newValue ? parseInt(newValue) : 0; // Converte o valor para número
                  handleChange("estado_ID", numericValue); // Atualiza o campo 'pais_ID' no formData
                }}
              >
                <Select.Trigger
                  className="!w-40"
                  placeholder={formData.estado || "Escolha o Estado"}
                />
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

            {/* DDD */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                DDD
              </Text>
              <TextField.Root
                defaultValue={formData.ddd}
                onChange={(e) => handleChange("ddd", e.target.value)}
                placeholder="Insira o DDD"
                className="w-24"
              />
            </label>

            {/* ATIVO? */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Ativo?
              </Text>

              <Select.Root
                defaultValue={formData.ativo ? "true" : "false"}
                onValueChange={(newValue) => {
                  const booleanValue = newValue === "true";
                  handleChange("ativo", booleanValue); // Atualiza o campo 'ativo' no formData
                }}
                disabled={disabled}
              >
                <Select.Trigger className="!w-20" />

                <Select.Content>
                  <Select.Item value="true">Sim</Select.Item>
                  <Select.Item value="false">Não</Select.Item>
                </Select.Content>
              </Select.Root>
            </label>
          </Flex>

          <Flex direction="row" gap="3" wrap={"wrap"} className="mt-9">
            {/* DATA DE CADASTRO */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Cadastro
              </Text>
              <TextField.Root
                value={
                  formData.data_cadastro
                    ? format(
                        new Date(formData.data_cadastro),
                        "dd/MM/yyyy HH:mm"
                      )
                    : ""
                }
                onChange={(e) => handleChange("data_cadastro", e.target.value)}
                placeholder="00/00/0000 00:00"
                className="w-32"
                disabled={true}
              />
            </label>

            {/* DATA DA ULTIMA ALTERAÇÃO */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Última Alteração
              </Text>
              <TextField.Root
                value={
                  formData.data_ult_alt
                    ? format(
                        new Date(formData.data_ult_alt),
                        "dd/MM/yyyy HH:mm"
                      )
                    : ""
                }
                onChange={(e) => handleChange("data_ult_alt", e.target.value)}
                placeholder="00/00/0000 00:00"
                className="w-32"
                disabled={true}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>

            {title === "Excluir" && (
              <Dialog.Close>
                <Button color="red" onClick={handleDelete}>
                  <Trash />
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
            {title === "Cadastrar" && (
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

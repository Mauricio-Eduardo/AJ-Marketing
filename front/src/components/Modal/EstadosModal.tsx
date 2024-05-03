import { useEffect, useState } from "react";
import { format } from "date-fns";
import { api } from "../../config/api";

import { Estados } from "../DataTable/EstadosDataTable";
import { Paises } from "../DataTable/PaisesDataTable";

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
  data: Estados;
};

export function EstadosModal({ data }: ModalProps) {
  // Varíavel que vai armazenar os dados e ser usada para as requisições para a API
  const [formData, setFormData] = useState<Estados>(data);

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
    setFormData({
      estado_ID: 0,
      pais_ID: 0,
      estado: "",
      uf: "",
      pais: "",
      ativo: true,
      data_cadastro: "",
      data_ult_alt: "",
    });
    setSelectedPais(0); // Aqui limpa o <Select> dos Países
  };

  // Verifica se todos os campos obrigatórios do estado estão preenchidos
  function verificaCampos(data: Estados): boolean {
    // Os campos de data não são necessários, a API cuida disso
    // O campo 'ativo' não precisa verificar porque sempre vai ter valor (true ou false)
    if (data.estado != "" && data.uf != "" && data.pais_ID) return true;
    return false;
  }

  /// Faz a requisição Post na API para incluir um estado
  const handleSave = () => {
    // Retira o 'estado_ID', 'pais', 'data_cadastro' e 'data_ult_alt' do 'formData' porque não são necessários para a requisição
    const { estado_ID, pais, data_cadastro, data_ult_alt, ...rest } = formData;

    if (verificaCampos(formData)) {
      api
        .post("Estados/postEstado", rest)
        .then((response) => {
          console.log("Resposta da API:", response.data);

          // Limpa o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao salvar o Estado:", error);
        });
    } else {
      console.error("Dados insuficientes!", rest);
    }
  };

  // Faz a requisição Post na API para editar um estado
  const handleEdit = () => {
    // Retira o 'pais', 'data_cadastro' e 'data_ult_alt' do 'formData' porque não são necessários para a requisição
    const { pais, data_cadastro, data_ult_alt, ...rest } = formData;

    if (verificaCampos(formData)) {
      api
        .put("Estados/putEstado", rest)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpar o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao editar o Estado:", error);
        });
    } else {
      console.error("Os campos não foram validados, verifique!", rest);
    }
  };

  // Faz a requisição Post na API para deletar/inativar um país
  const handleDelete = () => {
    // Não precisa verificar todos os campos, é necessário somente o 'estado_ID' para exlcuir/inativar um registro
    if (formData.estado_ID) {
      api
        .delete(`Estados/deleteEstado/${formData.estado_ID}`)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpa o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao excluir o Estado:", error);
          if (error.response && error.response.status === 500) {
            console.error(
              "Estado não pode ser deletado pois está sendo utilizado. Ele será inativado!"
            );
            // Aqui inativa o registro
            inativaEstado();
          }
        });
    } else {
      console.error("Dados insuficientes!");
    }
  };

  // Faz a requisição Post na API para inativar um país quando ele não puder ser excluído
  const inativaEstado = () => {
    // Retira o 'pais', 'data_cadastro' e 'data_ult_alt' do 'formData' porque não são necessários para a requisição
    const { pais, data_cadastro, data_ult_alt, ...rest } = formData;
    // Seta o 'ativo' como false, para inativar
    rest.ativo = false;

    if (verificaCampos(formData)) {
      api
        .put("Estados/putEstado", rest)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpar o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao inativar o Estado:", error);
        });
    } else {
      console.error("Os campos não foram validados, verifique!", rest);
    }
  };

  // Função para buscar os países da API
  const getAllPaisesAtivos = async () => {
    try {
      const response = await api.get<Paises[]>("Paises/getAllPaisesAtivos");
      const paisesData = response.data; // Supondo que a resposta contenha um array de países
      setPaises(paisesData); // Aqui os estados são setados como valores para escolha no <Select/>
    } catch (error) {
      console.error("Erro ao buscar países:", error);
    }
  };

  // Usado para puxar os PAISES no <Select />
  const [paises, setPaises] = useState<Paises[]>([]);
  const [, setSelectedPais] = useState<number | null>(null);

  // Aqui chama o getAllEstados() para setar os estados como valores no <Select/>
  useEffect(() => {
    getAllPaisesAtivos();
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
              value={formData.estado_ID}
              placeholder="0"
              className="w-20"
              disabled={true}
            />
          </label>

          <Flex direction="row" gap="3" wrap={"wrap"}>
            {/* ESTADO */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Estado
              </Text>
              <TextField.Root
                defaultValue={formData.estado}
                onChange={(e) => handleChange("estado", e.target.value)}
                placeholder="Insira o nome do Estado"
                className="w-48"
                disabled={disabled}
              />
            </label>

            {/* PAÍS */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                País
              </Text>
              <Select.Root
                onValueChange={(newValue) => {
                  const numericValue = newValue ? parseInt(newValue) : 0; // Converte o valor para número
                  handleChange("pais_ID", numericValue); // Atualiza o campo 'pais_ID' no formData
                }}
                disabled={disabled}
              >
                <Select.Trigger
                  className="!w-40"
                  // placeholder={formData.pais || "Escolha o País"}
                />
                <Select.Content>
                  {paises.map((pais) => (
                    <Select.Item
                      key={pais.pais_ID}
                      // value={String(pais.pais_ID)}
                      value={pais.pais}
                    >
                      {pais.pais}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </label>

            {/* UF */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                UF
              </Text>
              <TextField.Root
                defaultValue={formData.uf}
                onChange={(e) => handleChange("uf", e.target.value)}
                placeholder="Insira a UF"
                className="w-24"
                disabled={disabled}
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

import { useState } from "react";
import { api } from "../../config/api";
import { format } from "date-fns";

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
  data: Paises;
};

export function PaisesModal({ data }: ModalProps) {
  // Varíavel que vai armazenar os dados e ser usada para as requisições para a API
  const [formData, setFormData] = useState<Paises>(data);

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
      pais_ID: 0,
      pais: "",
      ddi: "",
      ativo: true,
      data_cadastro: "",
      data_ult_alt: "",
    });
  };

  // Verifica se todos os campos obrigatórios do país estão preenchidos
  function verificaCampos(data: Paises): boolean {
    // Os campos de data não são necessários, a API cuida disso
    // O campo de 'ddi' não é obrigatório
    // O campo 'ativo' não precisa verificar porque sempre vai ter valor (true ou false)
    if (data.pais != "") return true;
    return false;
  }

  // Faz a requisição Post na API para incluir um país
  const handleSave = () => {
    // Retira o 'pais_ID', 'data_cadastro' e 'data_ult_alt' do 'formData' porque não são necessários para a requisição
    const { pais_ID, data_cadastro, data_ult_alt, ...rest } = formData;

    if (verificaCampos(formData)) {
      api
        .post("Paises/postPais", rest)
        .then((response) => {
          console.log("Resposta da API:", response.data);

          // Limpa o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao salvar o País:", error);
        });
    } else {
      console.error("Dados insuficientes!", rest);
    }
  };

  // Faz a requisição Post na API para editar um país
  const handleEdit = () => {
    // retira a 'data_cadastro' e 'data_ult_alt' do 'formData' porque não são necessários para a requisição
    const { data_cadastro, data_ult_alt, ...rest } = formData;

    if (verificaCampos(formData)) {
      api
        .put("Paises/putPais", rest)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpar o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao editar o País:", error);
        });
    } else {
      console.error("Os campos não foram validados, verifique!", rest);
    }
  };

  // Faz a requisição Post na API para deletar/inativar um país
  const handleDelete = () => {
    // Não precisa verificar todos os campos, é necessário somente o 'pais_ID' para exlcuir/inativar um registro
    if (formData.pais_ID) {
      api
        .delete(`Paises/deletePais/${formData.pais_ID}`)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpa o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao excluir o País:", error);
          if (error.response && error.response.status === 500) {
            console.error(
              "País não pode ser deletado pois está sendo utilizado. Ele será inativado!"
            );
            // Aqui inativa o registro
            inativaPais();
          }
        });
    } else {
      console.error("Dados insuficientes!");
    }
  };

  // Faz a requisição Post na API para inativar um país quando ele não puder ser excluído
  const inativaPais = () => {
    // Retira a 'data_cadastro' e 'data_ult_alt' do 'formData' porque não são necessários para a requisição
    const { data_cadastro, data_ult_alt, ...rest } = formData;
    // Seta o 'ativo' como false, para inativar
    rest.ativo = false;

    if (verificaCampos(formData)) {
      api
        .put("Paises/putPais", rest)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Limpar o formulário após o sucesso da requisição
          limparDialog();
        })
        .catch((error) => {
          console.error("Erro ao inativar o País:", error);
        });
    } else {
      console.error("Os campos não foram validados, verifique!", rest);
    }
  };

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

        {/* Inputs de Cadastro */}
        <Dialog.Content maxWidth="450px">
          {/* TÍTULO */}
          <Dialog.Title>{title}</Dialog.Title>

          {/* CÓDIGO */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Código
            </Text>
            <TextField.Root
              value={formData.pais_ID}
              placeholder="0"
              className="w-20"
              disabled={true}
            />
          </label>

          <Flex direction="row" gap="3" wrap={"wrap"}>
            {/* PAÍS */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                País
              </Text>
              <TextField.Root
                value={formData.pais}
                onChange={(e) => handleChange("pais", e.target.value)}
                placeholder="Insira o nome do País"
                className="w-48"
                disabled={disabled}
              />
            </label>

            {/* DDI */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                DDI
              </Text>
              <TextField.Root
                value={formData.ddi}
                onChange={(e) => handleChange("ddi", e.target.value)}
                placeholder="Insira o DDI"
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

          {/* BOTÃO DE CANCELAR */}
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>

            {/* BOTÃO DE SALVAR OU EXCLUIR, DE ACORDO COM O TÍTULO */}
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

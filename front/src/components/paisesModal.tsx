import { FloppyDisk, Pencil, Plus, Trash } from "@phosphor-icons/react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

interface IPaisProps {
  pais_ID: number;
  pais: string;
  ddi: string;
}

interface IModalProps {
  tableProps?: IPaisProps; // deixei como não obrigatório porque caso seja um novo cadastro não terá nenhum atributo a ser passado
  title: string;
  color?: string;
}

export function PaisesModal({ tableProps, title, color }: IModalProps) {
  const [formData, setFormData] = useState({});

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const limparDialog = () => {
    // Limpar o formulário após o sucesso da requisição
    setFormData({
      pais_ID: 0,
      pais: "",
      ddi: "",
    });
  };

  const handleSave = () => {
    axios
      .post("https://localhost:7179/api/Paises/postPais", formData)
      .then((response) => {
        console.log("Resposta da API:", response.data);
        // Limpar o formulário após o sucesso da requisição
        limparDialog();
      })
      .catch((error) => {
        console.error("Erro ao salvar o País:", error);
      });
  };

  return (
    <div className="mb-4">
      <Dialog.Root onOpenChange={limparDialog}>
        {/* insere os ícones de acordo com o title do botao */}
        {title === "Novo País" && (
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
              value={tableProps?.pais_ID}
              placeholder="0"
              className="w-20"
              disabled={true}
            />
          </label>
          <Flex direction="row" gap="3" wrap={"wrap"}>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                País
              </Text>
              <TextField.Root
                value={tableProps?.pais}
                onChange={(e) => handleChange("pais", e.target.value)}
                placeholder="Insira o nome do País"
                className="w-48"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                DDI
              </Text>
              <TextField.Root
                value={tableProps?.ddi}
                onChange={(e) => handleChange("ddi", e.target.value)}
                placeholder="Insira o DDI"
                className="w-24"
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

import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../form";
import {
  IPaises,
  PostPaises,
  PutPaises,
  transformarParaPostPaises,
  transformarParaPutPaises,
} from "../../interfaces/IPaises";
import { format } from "date-fns";
import { PaisSchema, createPaisSchema } from "../../screens/paises/schema";

type ModalProps = {
  data: IPaises;
  action: string;
  onSuccess: () => void;
};

export function PaisDialog({ data, action, onSuccess }: ModalProps) {
  //
  // Configuração do Zod para validação dos formulários
  const paisForm = useForm<PaisSchema>({
    resolver: zodResolver(createPaisSchema),
  });
  const { control, handleSubmit, reset } = paisForm;

  // Essas variáveis controlam o componente ToastMessage, que exibe as mensagens de sucesso ou erro que são definidas dentro do onSubmit
  // e chamada no final do Dialog.Content
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");

  // Faz a requisição Post/Put/Delete/ na API
  const onSubmit = async (pData: IPaises) => {
    let message = "";
    let title = "";

    try {
      if (action === "Cadastrar") {
        const payload: PostPaises = transformarParaPostPaises(pData);
        await api.post("PostPais", JSON.stringify(payload));
        message = "País Inserido";
      } else if (action === "Editar") {
        const payload: PutPaises = transformarParaPutPaises(pData);
        await api.put("PutPais", JSON.stringify(payload));
        message = "País Alterado";
      } else if (action === "Excluir") {
        const id = pData.pais_ID;
        await api.delete("DeletePais", { params: { pais_ID: id } });
        message = "País Deletado";
      }
      title = "Sucesso";

      if (action === "Cadastrar") {
        reset();
      }
    } catch (error) {
      title = "Não foi possível Excluir";
      message = "Inative o registro";
    } finally {
      setToastTitle(title);
      setToastMessage(message);
      setOpenToast(true);
      onSuccess();
    }
  };

  // Toda vez que abrir a Modal vai executar esse código que carrega ou limpa o formulário
  useEffect(() => {
    if (action !== "Cadastrar") {
      reset({
        ...data,
        data_cadastro: data.data_cadastro
          ? format(new Date(data.data_cadastro), "dd/MM/yyyy HH:mm")
          : "",
        data_ult_alt: data.data_ult_alt
          ? format(new Date(data.data_ult_alt), "dd/MM/yyyy HH:mm")
          : "",
      });
    } else {
      reset({
        pais_ID: 0,
        pais: "",
        ddi: "",
        ativo: true,
        data_cadastro: "",
        data_ult_alt: "",
      });
    }
  }, [action]);

  // Render
  return (
    <div>
      <Dialog.Content>
        <Dialog.Title>{action} País</Dialog.Title>

        <FormProvider {...paisForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Linha 1 */}
            <div className="flex justify-between">
              <Form.Field>
                <Form.Label htmlFor="pais_ID">Código</Form.Label>
                <Form.Input
                  name="pais_ID"
                  placeholder="0"
                  value={data.pais_ID}
                  width={70}
                  disabled={true}
                />
                <Form.ErrorMessage field="pais_ID" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="ativo">Ativo *</Form.Label>
                <Form.AtivoSelect
                  control={control}
                  name="ativo"
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="ativo" />
              </Form.Field>
            </div>

            {/* Linha 2 */}
            <div className="flex gap-3">
              <Form.Field>
                <Form.Label htmlFor="pais">País *</Form.Label>
                <Form.Input
                  type="pais"
                  name="pais"
                  placeholder="Insira o País"
                  max={56}
                  width={250}
                  defaultValue={data.pais}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="pais" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="sigla">Sigla *</Form.Label>
                <Form.Input
                  type="sigla"
                  name="sigla"
                  placeholder="XX"
                  max={2}
                  width={70}
                  defaultValue={data.sigla}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="sigla" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="ddi">Ddi *</Form.Label>
                <Form.Input
                  type="ddi"
                  name="ddi"
                  placeholder="000"
                  max={3}
                  width={70}
                  defaultValue={data.ddi}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="ddi" />
              </Form.Field>
            </div>

            {/* Linha 3 */}
            <div className="flex gap-3">
              <Form.Field>
                <Form.Label htmlFor="data_cadastro">Cadastro</Form.Label>
                <Form.Input
                  type="data_cadastro"
                  name="data_cadastro"
                  placeholder="00/00/0000 00:00"
                  width={150}
                  defaultValue={data.data_cadastro}
                  disabled={true}
                />
                <Form.ErrorMessage field="data_ult_alt" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="data_ult_alt">Última Alteração</Form.Label>
                <Form.Input
                  type="data_ult_alt"
                  name="data_ult_alt"
                  placeholder="00/00/0000 00:00"
                  width={150}
                  defaultValue={data.data_ult_alt}
                  disabled={true}
                />
                <Form.ErrorMessage field="data_ult_alt" />
              </Form.Field>
            </div>

            {/* Submit Buttons */}
            <div className="flex w-full justify-end gap-3">
              <Dialog.Close>
                <Button variant="outline">Cancelar</Button>
              </Dialog.Close>
              {action === "Excluir" && <Button color="red">{action}</Button>}
              {action != "Excluir" && <Button>{action}</Button>}
            </div>
          </form>
        </FormProvider>

        <Form.ToastMessage
          title={toastTitle}
          description={toastMessage}
          open={openToast}
          onOpenChange={setOpenToast}
        />
      </Dialog.Content>
    </div>
  );
}

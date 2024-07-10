import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../form";
import {
  IOrigens,
  PostOrigens,
  PutOrigens,
  transformarParaPostOrigens,
  transformarParaPutOrigens,
} from "../../interfaces/IOrigens";
import { format } from "date-fns";
import { OrigemSchema, createOrigemSchema } from "../../screens/origens/schema";

type ModalProps = {
  data: IOrigens;
  action: string;
  onSuccess: () => void;
};

export function OrigemDialog({ data, action, onSuccess }: ModalProps) {
  //
  // Configuração do Zod para validação dos formulários
  const origemForm = useForm<OrigemSchema>({
    resolver: zodResolver(createOrigemSchema),
  });

  const { control, handleSubmit, reset } = origemForm;

  // Essas variáveis controlam o componente ToastMessage, que exibe as mensagens de sucesso ou erro que são definidas dentro do onSubmit
  // e chamada no final do Dialog.Content
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");

  // Faz a requisição Post/Put/Delete/ na API
  const onSubmit = async (pData: IOrigens) => {
    let title = "";
    let message = "";

    try {
      if (action === "Cadastrar") {
        const payload: PostOrigens = transformarParaPostOrigens(pData);
        await api.post("PostOrigem", JSON.stringify(payload));
        message = "Origem Inserida com Sucesso!";
      } else if (action === "Editar") {
        const payload: PutOrigens = transformarParaPutOrigens(pData);
        await api.put("PutOrigem", JSON.stringify(payload));
        message = "Origem Alterada com Sucesso!";
      } else if (action === "Excluir") {
        const id = pData.origem_ID;
        await api.delete("DeleteOrigem", { params: { origem_ID: id } });
        message = "Origem Deletada com Sucesso!";
      }

      title = "Sucesso";
      setToastMessage(message);
      setOpenToast(true);
      onSuccess();

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
        origem_ID: 0,
        origem: "",
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
        <Dialog.Title>{action} Origem</Dialog.Title>

        <FormProvider {...origemForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Linha 1 */}
            <div className="flex justify-between">
              <Form.Field>
                <Form.Label htmlFor="origem_ID">Código</Form.Label>
                <Form.Input
                  name="origem_ID"
                  placeholder="0"
                  value={data.origem_ID}
                  width={70}
                  disabled={true}
                />
                <Form.ErrorMessage field="origem_ID" />
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
                <Form.Label htmlFor="origem">Origem *</Form.Label>
                <Form.Input
                  type="origem"
                  name="origem"
                  placeholder="Insira a Origem"
                  max={30}
                  width={250}
                  defaultValue={data.origem}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="origem" />
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

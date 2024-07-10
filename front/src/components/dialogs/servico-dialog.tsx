import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, TextArea } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../form";
import { format } from "date-fns";
import {
  IServicos,
  PostServicos,
  PutServicos,
  transformarParaPostServicos,
  transformarParaPutServicos,
} from "../../interfaces/IServicos";
import {
  ServicoSchema,
  createServicoSchema,
} from "../../screens/servicos/schema";

type ModalProps = {
  data: IServicos;
  action: string;
  onSuccess: () => void;
};

export function ServicoDialog({ data, action, onSuccess }: ModalProps) {
  //
  // Configuração do Zod para validação dos formulários
  const servicoForm = useForm<ServicoSchema>({
    resolver: zodResolver(createServicoSchema),
  });

  const { control, handleSubmit, reset, register } = servicoForm;

  // Essas variáveis controlam o componente ToastMessage, que exibe as mensagens de sucesso ou erro que são definidas dentro do onSubmit
  // e chamada no final do Dialog.Content
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");

  // Faz a requisição Post/Put/Delete/ na API
  const onSubmit = async (pData: IServicos) => {
    let title = "";
    let message = "";

    try {
      if (action === "Cadastrar") {
        const payload: PostServicos = transformarParaPostServicos(pData);
        await api.post("PostServico", JSON.stringify(payload));
        message = "Serviço Inserido com Sucesso!";
      } else if (action === "Editar") {
        const payload: PutServicos = transformarParaPutServicos(pData);
        await api.put("PutServico", JSON.stringify(payload));
        message = "Serviço Alterado com Sucesso!";
      } else if (action === "Excluir") {
        const id = pData.servico_ID;
        await api.delete("DeleteServico", { params: { servico_ID: id } });
        message = "Serviço Deletado com Sucesso!";
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

  // Função para transformar número em string formatada
  const formatNumber = (value: any) => {
    return value !== undefined ? value.toFixed(2).replace(".", ",") : "";
  };

  // Toda vez que abrir a Modal vai executar esse código que carrega ou limpa o formulário
  useEffect(() => {
    console.log(action);
    if (action !== "Cadastrar") {
      reset({
        ...data,
        valor: formatNumber(data.valor),
        data_cadastro: data.data_cadastro
          ? format(new Date(data.data_cadastro), "dd/MM/yyyy HH:mm")
          : "",
        data_ult_alt: data.data_ult_alt
          ? format(new Date(data.data_ult_alt), "dd/MM/yyyy HH:mm")
          : "",
      });
    } else {
      reset({
        servico_ID: 0,
        servico: "",
        valor: "0,00",
        descricao: "",
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
        <Dialog.Title>{action} Serviço</Dialog.Title>

        <FormProvider {...servicoForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Linha 1 */}
            <div className="flex justify-between">
              <Form.Field>
                <Form.Label htmlFor="servico_ID">Código</Form.Label>
                <Form.Input
                  name="servico_ID"
                  placeholder="0"
                  value={data.servico_ID}
                  width={70}
                  disabled={true}
                />
                <Form.ErrorMessage field="servico_ID" />
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
                <Form.Label htmlFor="servico">Serviço *</Form.Label>
                <Form.Input
                  type="servico"
                  name="servico"
                  placeholder="Insira a Serviço"
                  max={30}
                  width={250}
                  defaultValue={data.servico}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="servico" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="valor">Valor *</Form.Label>
                <Form.Input
                  type="valor"
                  name="valor"
                  placeholder="0,00"
                  max={10}
                  width={150}
                  defaultValue={data.valor}
                  disabled={action === "Excluir"}
                  maskType="money"
                />
                <Form.ErrorMessage field="valor" />
              </Form.Field>
            </div>

            {/* Linha 3 */}
            <div className="flex flex-col gap-3">
              <Form.Label htmlFor="descricao">Descricao</Form.Label>
              <TextArea
                className="flex-1"
                maxLength={255}
                placeholder="Insira a descricao do serviço..."
                {...register("descricao")}
              />
              <Form.ErrorMessage field="descricao" />
            </div>

            {/* Linha 4 */}
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
              {action === "Excluir" && (
                <Button type="submit" color="red">
                  {action}
                </Button>
              )}
              {action != "Excluir" && <Button type="submit">{action}</Button>}
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

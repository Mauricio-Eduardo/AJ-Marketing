import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../form";
import { format } from "date-fns";
import {
  IFormasPagamento,
  PostFormasPagamento,
  PutFormasPagamento,
  transformarParaPostFormasPagamento,
  transformarParaPutFormasPagamento,
} from "../../interfaces/IFormasPagamento";
import {
  FormasPagamentoSchema,
  createFormasPagamentoSchema,
} from "../../screens/formasPagamento/schema";

type ModalProps = {
  data: IFormasPagamento;
  action: string;
  onSuccess: () => void;
};

export function FormasPagamentoDialog({ data, action, onSuccess }: ModalProps) {
  //
  // Configuração do Zod para validação dos formulários
  const formasPagamentoForm = useForm<FormasPagamentoSchema>({
    resolver: zodResolver(createFormasPagamentoSchema),
  });
  const { control, handleSubmit, reset } = formasPagamentoForm;

  // Essas variáveis controlam o componente ToastMessage, que exibe as mensagens de sucesso ou erro que são definidas dentro do onSubmit
  // e chamada no final do Dialog.Content
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenChange = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  // Faz a requisição Post/Put/Delete/ na API
  const onSubmit = async (pData: IFormasPagamento) => {
    let message = "";

    try {
      if (action === "Cadastrar") {
        const payload: PostFormasPagamento =
          transformarParaPostFormasPagamento(pData);
        await api.post("PostFormaPagamento", JSON.stringify(payload));
        message = "Forma de Pagamento Inserida com Sucesso!";
      } else if (action === "Editar") {
        const payload: PutFormasPagamento =
          transformarParaPutFormasPagamento(pData);
        await api.put("PutFormaPagamento", JSON.stringify(payload));
        message = "Forma de Pagamento Alterada com Sucesso!";
      } else if (action === "Excluir") {
        const id = pData.formaPag_ID;
        await api.delete("DeleteFormaPagamento", {
          params: { formaPag_ID: id },
        });
        message = "Forma de Pagamento Deletada com Sucesso!";
      }

      setToastTitle("Sucesso");
      setToastMessage(message);
      setOpenToast(true);
      onSuccess();

      if (action === "Cadastrar") {
        reset();
      }
    } catch (error) {
      setToastTitle("Erro");
      setToastMessage(`Erro na requisição: ${String(error)}`);
      setOpenToast(true);
    }
  };

  // Toda vez que abrir a Modal vai executar esse código que carrega ou limpa o formulário
  useEffect(() => {
    console.log(action);
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
        formaPag_ID: 0,
        formaPagamento: "",
        ativo: true,
        data_cadastro: "",
        data_ult_alt: "",
      });
    }
  }, [action]);

  // Render
  return (
    <div>
      <Dialog.Content onChange={handleOpenChange}>
        <Dialog.Title>{action} Forma de Pagamento</Dialog.Title>

        <FormProvider {...formasPagamentoForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Linha 1 */}
            <div className="flex justify-between">
              <Form.Field>
                <Form.Label htmlFor="formaPag_ID">Código</Form.Label>
                <Form.Input
                  name="formaPag_ID"
                  placeholder="0"
                  value={data.formaPag_ID}
                  width={70}
                  disabled={true}
                />
                <Form.ErrorMessage field="formaPag_ID" />
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
                <Form.Label htmlFor="formaPagamento">
                  Forma de Pagamento *
                </Form.Label>
                <Form.Input
                  type="formaPagamento"
                  name="formaPagamento"
                  placeholder="Insira a Forma de Pagamento"
                  max={50}
                  width={250}
                  defaultValue={data.formaPagamento}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="formaPagamento" />
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

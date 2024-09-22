import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { DialogProps } from "../DialogProps";
import { createFormasPagamentoSchema, FormasPagamentoSchema } from "./schema";
import { FormaPagamento } from "../../../models/formaPagamento/entity/FormaPagamento";
import { transformarParaPostFormaPagamento } from "../../../models/formaPagamento/dto/createFormaPagamento.dto";
import { transformarParaPutFormaPagamento } from "../../../models/formaPagamento/dto/updateFormaPagamento.dto";
import { format } from "date-fns";
import { Form } from "../../form";
import { X } from "@phosphor-icons/react";
import { toast } from "react-toastify";

export function FormaPagamentoDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
}: DialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const formasPagamentoForm = useForm<FormasPagamentoSchema>({
    resolver: zodResolver(createFormasPagamentoSchema),
  });

  const { control, handleSubmit, reset } = formasPagamentoForm;

  const onSubmit = async (pData: FormaPagamento) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Cadastrar") {
        const payload = transformarParaPostFormaPagamento(pData);
        await controller.create(payload);
        toast.update(toastId, {
          render: "Forma de Pagamento cadastrada com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (action === "Editar") {
        const payload = transformarParaPutFormaPagamento(pData);
        await controller.update(payload);
        toast.update(toastId, {
          render: "Forma de Pagamento atualizada com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (action === "Excluir") {
        const id = pData.id;
        await controller.delete(id);
        toast.update(toastId, {
          render: "Forma de Pagamento excluída com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Ocorreu um erro. Tente novamente!",
        type: "error",
        isLoading: false,
        draggable: true,
        draggableDirection: "x",
        autoClose: 3000,
      });
      console.log(error);
    }
  };

  const cleanData = () => {
    reset({
      id: 0,
      formaPagamento: "",
      ativo: true,
      data_cadastro: "",
      data_ult_alt: "",
    });
  };

  const loadData = () => {
    reset({
      ...data,
      data_cadastro: data.data_cadastro
        ? format(new Date(data.data_cadastro), "dd/MM/yyyy HH:mm")
        : "",
      data_ult_alt: data.data_ult_alt
        ? format(new Date(data.data_ult_alt), "dd/MM/yyyy HH:mm")
        : "",
    });
  };

  useEffect(() => {
    if (isOpenModal) {
      if (action !== "Cadastrar") {
        loadData();
      } else {
        cleanData();
      }
    }
  }, [isOpenModal, action]);

  return (
    <div>
      <Dialog.Content
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex justify-between">
          <Dialog.Title>{action} Forma de Pagamento</Dialog.Title>

          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>
        <FormProvider {...formasPagamentoForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Linha 1 */}
            <div className="flex justify-between">
              <Form.Field>
                <Form.Label htmlFor="id">Código</Form.Label>
                <Form.Input
                  name="id"
                  placeholder="0"
                  defaultValue={data.id}
                  width={70}
                  disabled={true}
                />
                <Form.ErrorMessage field="id" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="ativo">Ativo *</Form.Label>
                <Form.AtivoSelect
                  control={control}
                  name="ativo"
                  disabled={action != "Editar"}
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
                  name="data_ult_alt"
                  placeholder="00/00/0000 00:00"
                  width={150}
                  defaultValue={data.data_ult_alt}
                  disabled={true}
                />
                <Form.ErrorMessage field="data_ult_alt" />
              </Form.Field>
            </div>

            <div className="flex w-full justify-end gap-3">
              <Dialog.Close>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </Dialog.Close>
              {action === "Excluir" && <Button color="red">{action}</Button>}
              {action != "Excluir" && <Button>{action}</Button>}
            </div>
          </form>
        </FormProvider>
      </Dialog.Content>
    </div>
  );
}

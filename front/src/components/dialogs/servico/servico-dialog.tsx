import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, TextArea } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../form";
import { format } from "date-fns";
import { X } from "@phosphor-icons/react";
import { createServicoSchema, ServicoSchema } from "./schema";
import { DialogProps } from "../DialogProps";
import { Servico } from "../../../models/servico/entity/Servico";
import { transformarParaPostServico } from "../../../models/servico/dto/createServico.dto";
import { transformarParaPutServico } from "../../../models/servico/dto/updateServico.dto";
import { toast } from "react-toastify";

export function ServicoDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
}: DialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const servicoForm = useForm<ServicoSchema>({
    resolver: zodResolver(createServicoSchema),
  });

  const { control, handleSubmit, reset, register } = servicoForm;

  const onSubmit = async (pData: Servico) => {
    let toastId = toast.loading("Processando...");

    try {
      pData.valor = unmaskMoney(pData.valor);
      if (action === "Cadastrar") {
        const payload = transformarParaPostServico(pData);
        await controller.create(payload);
        toast.update(toastId, {
          render: "Serviço cadastrado com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
        reset();
      } else if (action === "Editar") {
        const payload = transformarParaPutServico(pData);
        await controller.update(payload);
        toast.update(toastId, {
          render: "Serviço atualizado com sucesso!",
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
          render: "Serviço excluído com sucesso!",
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
      servico: "",
      valor: "0,00",
      descricao: "",
      ativo: true,
      data_cadastro: "",
      data_ult_alt: "",
    });
  };

  const loadData = () => {
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

  const formatNumber = (value: any) => {
    return value !== undefined ? value.toFixed(2).replace(".", ",") : "";
  };

  const unmaskMoney = (value: string): string => {
    return value
      .replace(/\./g, "") // Remove todos os pontos
      .replace(/(\d+)(\d{2})$/, "$1.$2"); // Adiciona o ponto antes dos dois últimos dígitos
  };

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
          <Dialog.Title>{action} Serviço</Dialog.Title>

          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>

        <FormProvider {...servicoForm}>
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
                <Form.Label htmlFor="servico">Serviço *</Form.Label>
                <Form.Input
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
              <Form.Label htmlFor="descricao">Descrição</Form.Label>
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

            {/* Submit Buttons */}
            <div className="flex w-full justify-end gap-3">
              <Dialog.Close>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => cleanData()}
                >
                  Cancelar
                </Button>
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
      </Dialog.Content>
    </div>
  );
}

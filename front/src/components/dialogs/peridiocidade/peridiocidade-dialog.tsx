import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../form";
import { format } from "date-fns";
import { X } from "@phosphor-icons/react";
import { createPeridiocidadeSchema, PeridiocidadeSchema } from "./schema";
import { DialogProps } from "../DialogProps";
import { toast } from "react-toastify";
import { Peridiocidade } from "../../../models/peridiocidade/entity/Peridiocidade";
import { transformarParaPutPeridiocidade } from "../../../models/peridiocidade/dto/updatePeridiocidade.dto";
import { transformarParaPostPeridiocidade } from "../../../models/peridiocidade/dto/createPeridiocidade.dto";

export function PeridiocidadeDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
}: DialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const peridiocidadeForm = useForm<PeridiocidadeSchema>({
    resolver: zodResolver(createPeridiocidadeSchema),
  });

  const { control, handleSubmit, reset } = peridiocidadeForm;

  const onSubmit = async (pData: Peridiocidade) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Cadastrar") {
        const payload = transformarParaPostPeridiocidade(pData);
        await controller.create(payload);
        toast.update(toastId, {
          render: "Peridiocidade cadastrada com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
        reset();
      } else if (action === "Editar") {
        const payload = transformarParaPutPeridiocidade(pData);
        await controller.update(payload);
        toast.update(toastId, {
          render: "Peridiocidade atualizada com sucesso!",
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
          render: "Peridiocidade excluída com sucesso!",
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
      descricao: "",
      dias: 0,
      ativo: true,
      data_cadastro: "",
      data_ult_alt: "",
    });
  };

  const loadData = () => {
    reset({
      ...data,
      dias: String(data.dias),
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
          <Dialog.Title>{action} Peridiocidade</Dialog.Title>

          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>

        <FormProvider {...peridiocidadeForm}>
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
                <Form.Label htmlFor="descricao">Descrição *</Form.Label>
                <Form.Input
                  name="descricao"
                  placeholder="Insira a descrição"
                  max={20}
                  width={250}
                  defaultValue={data.descricao}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="descricao" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="dias">Dias *</Form.Label>
                <Form.Input
                  name="dias"
                  placeholder="0"
                  max={3}
                  width={100}
                  defaultValue={data.dias}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="dias" />
              </Form.Field>
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

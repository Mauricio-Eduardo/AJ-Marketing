import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../form";
import { format } from "date-fns";
import { CidadeSchema, createCidadeSchema } from "./schema";
import { Estado } from "../../../models/estado/entity/Estado";
import { Cidade } from "../../../models/cidade/entity/Cidade";
import { transformarParaPostCidade } from "../../../models/cidade/dto/createCidade.dto";
import { transformarParaPutCidade } from "../../../models/cidade/dto/updateCidade.dto";
import { X } from "@phosphor-icons/react";
import { DialogProps } from "../DialogProps";
import { EstadosSubView } from "../../../views/estados/subView";
import { toast } from "react-toastify";

export function CidadeDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
  subController,
}: DialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const cidadeForm = useForm<CidadeSchema>({
    resolver: zodResolver(createCidadeSchema),
  });
  const { control, handleSubmit, setValue, reset } = cidadeForm;

  const onSubViewClose = (estado?: Estado) => {
    if (estado) {
      setEstado(estado);
    }
  };

  const onSubmit = async (pData: Cidade) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Cadastrar") {
        const payload = transformarParaPostCidade(pData);
        await controller.create(payload);
        toast.update(toastId, {
          render: "Cidade cadastrada com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (action === "Editar") {
        const payload = transformarParaPutCidade(pData);
        await controller.update(payload);
        toast.update(toastId, {
          render: "Cidade atualizada com sucesso!",
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
          render: "Cidade excluída com sucesso!",
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
      cidade: "",
      ddd: "",
      estado_id: 0,
      estado: "",
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

  const getEstado = async (pId: number) => {
    if (pId != 0) {
      if (subController) {
        try {
          const response = await subController.getOne(pId);
          if (response.ativo) {
            setEstado(response);
          } else {
            setEstadoNull();
          }
        } catch (error) {
          setEstadoNull();
          console.log(error);
        }
      }
    }
  };

  const setEstado = (pEstado: Estado) => {
    setValue("estado_id", pEstado.id);
    setValue("estado", pEstado.estado);
  };

  const setEstadoNull = () => {
    setValue("estado_id", 0);
    setValue("estado", "");
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
          <Dialog.Title>{action} Cidade</Dialog.Title>

          {/* <ToastContainer /> */}

          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>

        <FormProvider {...cidadeForm}>
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
                <Form.Label htmlFor="cidade">Cidade *</Form.Label>
                <Form.Input
                  name="cidade"
                  placeholder="Insira a Cidade"
                  max={100}
                  width={250}
                  defaultValue={data.cidade}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="cidade" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="ddd">DDD *</Form.Label>
                <Form.Input
                  name="ddd"
                  placeholder="00"
                  max={2}
                  width={70}
                  defaultValue={data.ddd}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="ddd" />
              </Form.Field>
            </div>

            {/* Linha 3 */}
            <div className="flex gap-3 items-center">
              <Form.Field>
                <Form.Label htmlFor="estado_id">Cód. *</Form.Label>
                <Form.Input
                  name="estado_id"
                  placeholder="0"
                  max={5}
                  width={70}
                  defaultValue={data.estado_id}
                  onBlur={(e) => getEstado(Number(e.target.value))}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="estado_id" />
              </Form.Field>

              {subController && (
                <Form.Field>
                  <br />
                  <EstadosSubView
                    onClose={onSubViewClose}
                    controller={subController}
                  />
                </Form.Field>
              )}

              <Form.Field>
                <Form.Label htmlFor="estado">Estado</Form.Label>
                <Form.Input
                  name="estado"
                  placeholder="Selecione o Estado"
                  max={56}
                  width={250}
                  value={data.estado}
                  disabled={true}
                />
                <Form.ErrorMessage field="estado" />
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
      </Dialog.Content>
    </div>
  );
}

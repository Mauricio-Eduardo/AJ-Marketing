import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../form";
import { format } from "date-fns";
import { EstadoSchema, createEstadoSchema } from "./schema";
import { Estado } from "../../../models/estado/entity/Estado";
import { transformarParaPostEstado } from "../../../models/estado/dto/createEstado.dto";
import { transformarParaPutEstado } from "../../../models/estado/dto/updateEstado.dto";
import { Pais } from "../../../models/pais/entity/Pais";
import { PaisesSubView } from "../../../views/paises/subView";
import { X } from "@phosphor-icons/react";
import { DialogProps } from "../DialogProps";
import { toast } from "react-toastify";

export function EstadoDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
  subController,
}: DialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const estadoForm = useForm<EstadoSchema>({
    resolver: zodResolver(createEstadoSchema),
  });
  const { control, handleSubmit, setValue, reset } = estadoForm;

  const onSubViewClose = (pais?: Pais) => {
    if (pais) {
      setPais(pais);
    }
  };

  const onSubmit = async (pData: Estado) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Cadastrar") {
        const payload = transformarParaPostEstado(pData);
        await controller.create(payload);
        toast.update(toastId, {
          render: "Estado cadastrado com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (action === "Editar") {
        const payload = transformarParaPutEstado(pData);
        await controller.update(payload);
        toast.update(toastId, {
          render: "Estado atualizado com sucesso!",
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
          render: "Estado excluído com sucesso!",
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
      estado: "",
      uf: "",
      pais_id: 0,
      pais: "",
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

  const getPais = async (pId: number) => {
    if (pId != 0) {
      if (subController) {
        try {
          const response = await subController.getOne(pId);
          if (response.ativo) {
            setPais(response);
          } else {
            setPaisNull();
          }
        } catch (error) {
          setPaisNull();
          console.log(error);
        }
      }
    }
  };

  const setPais = (pPais: Pais) => {
    setValue("pais_id", pPais.id);
    setValue("pais", pPais.pais);
  };

  const setPaisNull = () => {
    setValue("pais_id", 0);
    setValue("pais", "");
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
          <Dialog.Title>{action} Estado</Dialog.Title>

          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>

        <FormProvider {...estadoForm}>
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
                <Form.Label htmlFor="estado">Estado *</Form.Label>
                <Form.Input
                  name="estado"
                  placeholder="Insira o Estado"
                  max={56}
                  width={250}
                  defaultValue={data.estado}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="estado" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="uf">UF *</Form.Label>
                <Form.Input
                  name="uf"
                  placeholder="XX"
                  max={2}
                  width={70}
                  defaultValue={data.uf}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="uf" />
              </Form.Field>
            </div>

            {/* Linha 3 */}
            <div className="flex gap-3 items-center">
              <Form.Field>
                <Form.Label htmlFor="pais_id">Cód. *</Form.Label>
                <Form.Input
                  name="pais_id"
                  placeholder="0"
                  max={5}
                  width={70}
                  defaultValue={data.pais_id}
                  onBlur={(e) => getPais(Number(e.target.value))}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="pais_id" />
              </Form.Field>

              {subController && (
                <Form.Field>
                  <br />
                  <PaisesSubView
                    onClose={onSubViewClose}
                    controller={subController}
                  />
                </Form.Field>
              )}

              <Form.Field>
                <Form.Label htmlFor="pais">País</Form.Label>
                <Form.Input
                  name="pais"
                  placeholder="Selecione o País"
                  max={56}
                  width={250}
                  defaultValue={data.pais}
                  disabled={true}
                />
                <Form.ErrorMessage field="pais" />
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

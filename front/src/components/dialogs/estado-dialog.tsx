import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../form";
import { format } from "date-fns";
import {
  IEstados,
  PostEstados,
  PutEstados,
  transformarParaPostEstados,
  transformarParaPutEstados,
} from "../../interfaces/IEstados";
import { EstadoSchema, createEstadoSchema } from "../../screens/estados/schema";
import { SearchButton } from "./search-dialog";
import { PaisesScreen } from "../../screens/paises";

type ModalProps = {
  data: IEstados;
  action: string;
  onSuccess: () => void;
};

export function EstadoDialog({ data, action, onSuccess }: ModalProps) {
  //
  // Configuração do Zod para validação dos formulários
  const estadoForm = useForm<EstadoSchema>({
    resolver: zodResolver(createEstadoSchema),
  });
  const { control, handleSubmit, setValue, reset } = estadoForm;

  // Essas variáveis controlam o componente ToastMessage, que exibe as mensagens de sucesso ou erro que são definidas dentro do onSubmit
  // E chamada no final do Dialog.Content
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");

  // Faz a requisição Post/Put/Delete/ na API
  const onSubmit = async (pData: IEstados) => {
    let title = "";
    let message = "";

    try {
      if (action === "Cadastrar") {
        const payload: PostEstados = transformarParaPostEstados(pData);
        await api.post("PostEstado", JSON.stringify(payload));
        message = "Estado Inserido";
      } else if (action === "Editar") {
        const payload: PutEstados = transformarParaPutEstados(pData);
        await api.put("PutEstado", JSON.stringify(payload));
        message = "Estado Alterado";
      } else if (action === "Excluir") {
        const id = pData.estado_ID;
        await api.delete("DeleteEstado", { params: { estado_ID: id } });
        message = "Estado Deletado";
      }

      title = "Sucesso!";

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
        estado_ID: 0,
        estado: "",
        uf: "",
        pais_ID: 0,
        ativo: true,
        data_cadastro: "",
        data_ult_alt: "",
      });
    }
  }, [action]);

  const getPais = async (pId: number) => {
    if (pId != 0) {
      try {
        await api
          .get("GetPais", { params: { pais_ID: pId } })
          .then((response) => {
            let { pais } = response.data;
            setValue("pais", pais);
          })
          .catch(() => {
            setValue("pais_ID", 0);
            setToastTitle("Ação inválida!");
            setToastMessage("Pais inativo ou inexistente!");
            setOpenToast(true);
          });
      } catch (error) {
        setToastTitle("Erro");
        setToastMessage(`Erro na requisição: ${String(error)}`);
        setOpenToast(true);
      }
    }
  };

  // Render
  return (
    <div>
      <Dialog.Content>
        <Dialog.Title>{action} Estado</Dialog.Title>

        <FormProvider {...estadoForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Linha 1 */}
            <div className="flex justify-between">
              <Form.Field>
                <Form.Label htmlFor="estado_ID">Código</Form.Label>
                <Form.Input
                  name="estado_ID"
                  placeholder="0"
                  value={data.estado_ID}
                  width={70}
                  disabled={true}
                />
                <Form.ErrorMessage field="estado_ID" />
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
                <Form.Label htmlFor="estado">Estado *</Form.Label>
                <Form.Input
                  type="estado"
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
                  type="uf"
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
                <Form.Label htmlFor="pais_ID">Cód. *</Form.Label>
                <Form.Input
                  type="pais_ID"
                  name="pais_ID"
                  placeholder="0"
                  max={5}
                  width={70}
                  defaultValue={data.pais_ID}
                  onBlur={(e) => getPais(Number(e.target.value))}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="pais_ID" />
              </Form.Field>

              <Form.Field>
                <br />
                <SearchButton ChildModal={PaisesScreen} />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="pais">País</Form.Label>
                <Form.Input
                  type="pais"
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

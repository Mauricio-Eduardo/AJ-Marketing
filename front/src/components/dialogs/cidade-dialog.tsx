import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../form";
import { format } from "date-fns";
import { SearchButton } from "./search-dialog";
import {
  ICidades,
  PostCidades,
  PutCidades,
  transformarParaPutCidades,
  transformarParaPostCidades,
} from "../../interfaces/ICidades";
import { CidadeSchema, createCidadeSchema } from "../../screens/cidades/schema";
import { EstadosScreen } from "../../screens/estados";

type ModalProps = {
  data: ICidades;
  action: string;
  onSuccess: () => void;
};

export function CidadeDialog({ data, action, onSuccess }: ModalProps) {
  //
  // Configuração do Zod para validação dos formulários
  const cidadeForm = useForm<CidadeSchema>({
    resolver: zodResolver(createCidadeSchema),
  });
  const { control, handleSubmit, setValue, reset } = cidadeForm;

  // Essas variáveis controlam o componente ToastMessage, que exibe as mensagens de sucesso ou erro que são definidas dentro do onSubmit
  // E chamada no final do Dialog.Content
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");

  // Faz a requisição Post/Put/Delete/ na API
  const onSubmit = async (pData: ICidades) => {
    let title = "";
    let message = "";

    try {
      if (action === "Cadastrar") {
        const payload: PostCidades = transformarParaPostCidades(pData);
        await api.post("PostCidade", JSON.stringify(payload));
        message = "Cidade Inserida com Sucesso!";
      } else if (action === "Editar") {
        const payload: PutCidades = transformarParaPutCidades(pData);
        await api.put("PutCidade", JSON.stringify(payload));
        message = "Cidade Alterada com Sucesso!";
      } else if (action === "Excluir") {
        const id = pData.estado_ID;
        await api.delete("DeleteCidade", { params: { cidade_ID: id } });
        message = "Cidade Deletada com Sucesso!";
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
        cidade_ID: 0,
        cidade: "",
        ddd: "",
        estado_ID: 0,
        estado: "",
        ativo: true,
        data_cadastro: "",
        data_ult_alt: "",
      });
    }
  }, [action]);

  const getEstado = async (pId: number) => {
    if (pId != 0) {
      try {
        await api
          .get("GetEstado", { params: { estado_ID: pId } })
          .then((response) => {
            let { estado } = response.data;
            setValue("estado", estado);
          })
          .catch(() => {
            setValue("estado_ID", 0);
            setToastTitle("Ação inválida!");
            setToastMessage("Pais inativo!");
            setOpenToast(true);
          });
      } catch (error) {
        setToastTitle("Sucesso");
        setToastMessage(`Erro na requisição: ${String(error)}`);
        setOpenToast(true);
      }
    }
  };

  // Render
  return (
    <div>
      <Dialog.Content>
        <Dialog.Title>{action} Cidade</Dialog.Title>

        <FormProvider {...cidadeForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Linha 1 */}
            <div className="flex justify-between">
              <Form.Field>
                <Form.Label htmlFor="cidade_ID">Código</Form.Label>
                <Form.Input
                  name="cidade_ID"
                  placeholder="0"
                  value={data.cidade_ID}
                  width={70}
                  disabled={true}
                />
                <Form.ErrorMessage field="cidade_ID" />
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
                <Form.Label htmlFor="cidade">Cidade *</Form.Label>
                <Form.Input
                  type="cidade"
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
                  type="ddd"
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
                <Form.Label htmlFor="estado_ID">Cod. *</Form.Label>
                <Form.Input
                  type="estado_ID"
                  name="estado_ID"
                  placeholder="0"
                  max={5}
                  width={70}
                  defaultValue={data.estado_ID}
                  onBlur={(e) => getEstado(Number(e.target.value))}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="estado_ID" />
              </Form.Field>

              <Form.Field>
                <br />
                <SearchButton ChildModal={EstadosScreen} />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="estado">Estado</Form.Label>
                <Form.Input
                  type="estado"
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

import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../form";
import { format } from "date-fns";
import {
  UsuarioSchema,
  createUsuarioSchema,
} from "../../screens/usuarios/schema";
import {
  IUsuarios,
  PostUsuarios,
  PutUsuarios,
  transformarParaPostUsuarios,
  transformarParaPutUsuarios,
} from "../../interfaces/IUsuarios";
import { Eye, EyeSlash } from "@phosphor-icons/react";

type ModalProps = {
  data: IUsuarios;
  action: string;
  onSuccess: () => void;
};

export function UsuarioDialog({ data, action, onSuccess }: ModalProps) {
  //
  // Configuração do Zod para validação dos formulários
  const usuarioForm = useForm<UsuarioSchema>({
    resolver: zodResolver(createUsuarioSchema),
    // defaultValues: {
    //   reset()
    // },
  });
  const { control, handleSubmit, reset } = usuarioForm;

  // Essas variáveis controlam o componente ToastMessage, que exibe as mensagens de sucesso ou erro que são definidas dentro do onSubmit
  // E chamada no final do Dialog.Content
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);

  // Faz a requisição Post/Put/Delete/ na API
  const onSubmit = async (pData: IUsuarios) => {
    let title = "";
    let message = "";

    try {
      if (action === "Cadastrar") {
        const payload: PostUsuarios = transformarParaPostUsuarios(pData);
        await api.post("PostUsuario", JSON.stringify(payload));
        message = "Usuario Inserido com Sucesso!";
      } else if (action === "Editar") {
        const payload: PutUsuarios = transformarParaPutUsuarios(pData);
        await api.put("PutUsuario", JSON.stringify(payload));
        message = "Usuario Alterado com Sucesso!";
      } else if (action === "Excluir") {
        const id = pData.usuario_ID;
        await api.delete("DeleteUsuario", { params: { usuario_ID: id } });
        message = "Usuario Deletado com Sucesso!";
      }

      title = "Sucesso!";

      if (action === "Cadastrar") {
        reset({});
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
        usuario_ID: 0,
        cpf: "",
        nome: "",
        email: "",
        senha: "",
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
        <Dialog.Title>{action} Usuário</Dialog.Title>

        <FormProvider {...usuarioForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Linha 1 */}
            <div className="flex justify-between">
              <Form.Field>
                <Form.Label htmlFor="usuario_ID">Código</Form.Label>
                <Form.Input
                  name="usuario_ID"
                  placeholder="0"
                  value={data.usuario_ID}
                  width={70}
                  disabled={true}
                />
                <Form.ErrorMessage field="usuario_ID" />
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
                <Form.Label htmlFor="cpf">CPF *</Form.Label>
                <Form.Input
                  type="cpf"
                  name="cpf"
                  placeholder="000.000.000-00"
                  max={11}
                  width={130}
                  defaultValue={data.cpf}
                  disabled={action === "Excluir"}
                  // maskType="cpf"
                />
                <Form.ErrorMessage field="cpf" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="nome">Nome *</Form.Label>
                <Form.Input
                  type="nome"
                  name="nome"
                  placeholder="Nome completo"
                  max={50}
                  width={370}
                  defaultValue={data.nome}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="nome" />
              </Form.Field>
            </div>

            {/* Linha 3 */}
            <div className="flex gap-3 items-center">
              <Form.Field>
                <Form.Label htmlFor="email">Email *</Form.Label>
                <Form.Input
                  type="email"
                  name="email"
                  placeholder="exemplo@hotmail.com"
                  max={50}
                  width={300}
                  defaultValue={data.email}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="email" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="senha">Senha</Form.Label>
                <div className="flex gap-2 items-center">
                  <Form.Input
                    type={showPassword ? "text" : "senha"}
                    name="senha"
                    placeholder="*******"
                    max={30}
                    width={200}
                    defaultValue={data.senha}
                    disabled={action === "Excluir"}
                  />
                  {!showPassword ? (
                    <EyeSlash onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <Eye onClick={() => setShowPassword(!showPassword)} />
                  )}
                </div>

                <Form.ErrorMessage field="senha" />
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

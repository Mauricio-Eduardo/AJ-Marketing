import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../form";
import { format } from "date-fns";
import { Eye, EyeSlash, X } from "@phosphor-icons/react";
import { DialogProps } from "../DialogProps";
import { createUsuarioSchema, UsuarioSchema } from "./schema";
import { Usuario } from "../../../models/usuario/entity/Usuario";
import { transformarParaPostUsuario } from "../../../models/usuario/dto/createUsuario.dto";
import { transformarParaPutUsuario } from "../../../models/usuario/dto/updateUsuario.dto";
import { toast } from "react-toastify";
import { AlertCancel, AlertCancelX, AlertSubmit } from "../../form/Alerts";

export function UsuarioDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
}: DialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const usuarioForm = useForm<UsuarioSchema>({
    resolver: zodResolver(createUsuarioSchema),
  });
  const { control, handleSubmit, reset } = usuarioForm;

  const [showPassword, setShowPassword] = useState(false);

  const [preenchido, setPreenchido] = useState<boolean>(false);

  const handlePreenchidoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPreenchido(value.length > 0); // Define como true se houver texto, caso contrário, false
  };

  const onSubmit = async (pData: Usuario) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Cadastrar") {
        const payload = transformarParaPostUsuario(pData);
        await controller.create(payload);
        toast.update(toastId, {
          render: "Usuario cadastrado com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (action === "Editar") {
        const payload = transformarParaPutUsuario(pData);
        await controller.update(payload);
        toast.update(toastId, {
          render: "Usuario atualizado com sucesso!",
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
          render: "Usuario excluído com sucesso!",
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
      nome: "",
      email: "",
      senha: "",
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
          <Dialog.Title>{action} Usuário</Dialog.Title>
          {preenchido ? (
            <AlertCancelX />
          ) : (
            <Dialog.Close>
              <X />
            </Dialog.Close>
          )}
        </div>

        <FormProvider {...usuarioForm}>
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
              <Form.Field className="flex-1">
                <Form.Label htmlFor="nome">Nome *</Form.Label>
                <Form.Input
                  name="nome"
                  placeholder="Nome completo"
                  max={50}
                  defaultValue={data.nome}
                  disabled={action === "Excluir" || action === "Visualizar"}
                  preenchidoChange={handlePreenchidoChange}
                />
                <Form.ErrorMessage field="nome" />
              </Form.Field>
            </div>

            {/* Linha 3 */}
            <div className="flex gap-3 items-center">
              <Form.Field>
                <Form.Label htmlFor="email">Email *</Form.Label>
                <Form.Input
                  name="email"
                  placeholder="exemplo@hotmail.com"
                  max={50}
                  width={300}
                  defaultValue={data.email}
                  disabled={action === "Excluir" || action === "Visualizar"}
                  preenchidoChange={handlePreenchidoChange}
                />
                <Form.ErrorMessage field="email" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="senha">Senha</Form.Label>
                <div className="flex gap-2 items-center">
                  <Form.Input
                    name="senha"
                    placeholder="*******"
                    type={showPassword ? "text" : "password"}
                    max={30}
                    width={200}
                    defaultValue={data.senha}
                    disabled={action === "Excluir" || action === "Visualizar"}
                    preenchidoChange={handlePreenchidoChange}
                  />

                  <Button
                    type="button"
                    variant="soft"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <EyeSlash /> : <Eye />}
                  </Button>
                </div>

                <Form.ErrorMessage field="senha" />
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
              {preenchido ? (
                <AlertCancel />
              ) : (
                <Dialog.Close>
                  <Button variant="outline">Cancelar</Button>
                </Dialog.Close>
              )}

              {action != "Visualizar" && (
                <AlertSubmit
                  title={action as string}
                  type="Usuário"
                  onSubmit={onSubmit}
                />
              )}
            </div>
          </form>
        </FormProvider>
      </Dialog.Content>
    </div>
  );
}

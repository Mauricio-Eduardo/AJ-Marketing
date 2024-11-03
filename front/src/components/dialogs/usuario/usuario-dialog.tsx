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
import { UsuariosSubView } from "../../../views/usuarios/subView";
import { AxiosError, AxiosResponse } from "axios";

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
    resolver: zodResolver(createUsuarioSchema(action)),
  });
  const { control, handleSubmit, reset, setValue } = usuarioForm;

  const [showPassword, setShowPassword] = useState(false);

  const [preenchido, setPreenchido] = useState<boolean>(false);

  const handlePreenchidoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPreenchido(value.length > 0); // Define como true se houver texto, caso contrário, false
  };

  const onUsuarioSubViewClose = (usuario?: Usuario) => {
    if (usuario?.ativo) {
      setUsuario(usuario);
      setPreenchido(true);
    } else {
      setUsuarioNull("inativo");
    }
  };

  const setUsuario = (usuario: Usuario) => {
    setValue("novoUsuario_id", usuario.id);
    setValue("novoUsuario_nome", usuario.nome);
  };

  const setUsuarioNull = (str: string) => {
    setValue("novoUsuario_id", 0);
    setValue("novoUsuario_nome", "");

    toast(`Usuário ${str}!`, {
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  };

  const getUsuario = async (pId: number) => {
    if (pId != 0) {
      if (controller) {
        try {
          const response = await controller.getOne(pId);
          if (response.ativo) {
            setUsuario(response);
          } else {
            setUsuarioNull("inativo");
          }
        } catch (error) {
          setUsuarioNull("inexistente");
        }
      }
    } else {
      setUsuarioNull("inexistente");
    }
  };

  const onSubmit = async (pData: Usuario) => {
    let toastId = toast.loading("Processando...");
    let response: AxiosResponse<string> | undefined;

    try {
      if (action === "Cadastrar") {
        const payload = transformarParaPostUsuario(pData);
        response = await controller.create(payload);
      } else if (action === "Editar") {
        const payload = transformarParaPutUsuario(pData);
        response = await controller.update(payload);
      } else if (action === "Excluir") {
        const id = pData.id;
        response = await controller.delete(id, pData.novoUsuario_id);
      }
      toast.update(toastId, {
        render: response?.data,
        type: "success",
        isLoading: false,
        draggable: true,
        draggableDirection: "x",
        autoClose: 1000,
        onClose: onSuccess,
      });
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data;
      toast.update(toastId, {
        render: String(errorMessage),
        type: "error",
        isLoading: false,
        draggable: true,
        draggableDirection: "x",
        autoClose: 3000,
      });
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
      novoUsuario_id: null,
    });
  };

  const loadData = () => {
    reset({
      ...data,
      senha: "",
      novoUsuario_id: null,
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
        autoFocus
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
                <Form.Label htmlFor="senha">
                  {action === "Editar" ? "Nova Senha" : "Senha *"}
                </Form.Label>
                <div className="flex gap-2 items-center">
                  <Form.Input
                    name="senha"
                    placeholder="*******"
                    type={showPassword ? "text" : "password"}
                    max={30}
                    width={200}
                    disabled={action === "Excluir" || action === "Visualizar"}
                    preenchidoChange={handlePreenchidoChange}
                  />

                  <Button
                    type="button"
                    variant="soft"
                    disabled={action === "Visualizar" || action === "Excluir"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <EyeSlash /> : <Eye />}
                  </Button>
                </div>
                <Form.ErrorMessage field="senha" />
              </Form.Field>
            </div>

            {/* Linha 4 */}
            <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
              <div className="flex flex-col gap-3 justify-between">
                <span className="text-sm font-medium">
                  Transferir responsabilidades para um outro Usuário
                </span>
                <div className="flex gap-3 items-end border-2 border-gray-200 rounded p-2 justify-start">
                  <Form.Field>
                    <Form.Label htmlFor="novoUsuario_id">
                      Código Usuário *
                    </Form.Label>
                    <Form.Input
                      name="novoUsuario_id"
                      placeholder="0"
                      max={5}
                      width={100}
                      defaultValue={data.usuario_id}
                      disabled={
                        action === "Cadastrar" || action === "Visualizar"
                      }
                      onBlur={(e) => getUsuario(Number(e.target.value))}
                      preenchidoChange={handlePreenchidoChange}
                    />
                    <Form.ErrorMessage field="novoUsuario_id" />
                  </Form.Field>

                  <Form.Field>
                    <br />
                    <UsuariosSubView
                      onClose={onUsuarioSubViewClose}
                      controller={controller}
                      disabled={
                        action === "Cadastrar" || action === "Visualizar"
                      }
                    />
                  </Form.Field>

                  <Form.Field className="flex-1">
                    <Form.Label htmlFor="novoUsuario_nome">Nome</Form.Label>
                    <Form.Input name="novoUsuario_nome" disabled={true} />
                    <Form.ErrorMessage field="novoUsuario_nome" />
                  </Form.Field>
                </div>
              </div>
            </div>

            {/* <div className="flex gap-3 items-center">
              <Form.Field>
                <Form.Label htmlFor="senhaAtual">Senha Atual</Form.Label>
                <div className="flex gap-2 items-center">
                  <Form.Input
                    name="senhaAtual"
                    placeholder="*******"
                    type={showPassword ? "text" : "password"}
                    max={30}
                    width={200}
                    disabled={action === "Cadastrar" || action === "Visualizar"}
                    preenchidoChange={handlePreenchidoChange}
                  />

                  <Button
                    type="button"
                    variant="soft"
                    disabled={action === "Cadastrar" || action === "Visualizar"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <EyeSlash /> : <Eye />}
                  </Button>
                </div>
                <Form.ErrorMessage field="senhaAtual" />
              </Form.Field>
            </div> */}

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
                  <Button variant="outline">Voltar</Button>
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

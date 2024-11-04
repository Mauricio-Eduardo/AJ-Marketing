import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, TextArea } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../form";
import { format } from "date-fns";
import { X } from "@phosphor-icons/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { DialogProps } from "../DialogProps";
import { Datepick } from "../../form/Datepicker";
import { AlertCancel, AlertCancelX, AlertSubmit } from "../../form/Alerts";
import { UsuariosController } from "../../../controllers/usuarios-controller";
import { createOrdensServicoSchema, OrdensServicoSchema } from "./schema";
import { Usuario } from "../../../models/usuario/entity/Usuario";
import { transformarParaPutOrdemServico } from "../../../models/ordemServico/dto/updateOrdemServico.dto";
import { OrdemServico } from "../../../models/ordemServico/entity/OrdemServico";
import { UsuariosSubView } from "../../../views/usuarios/subView";

interface OrdemServicoDialogProps extends DialogProps {
  usuariosController: UsuariosController;
}

export function OrdemServicoDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
  usuariosController,
}: OrdemServicoDialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const ordensServicoForm = useForm<OrdensServicoSchema>({
    resolver: zodResolver(createOrdensServicoSchema),
    shouldFocusError: false,
  });
  const { register, handleSubmit, reset, setValue } = ordensServicoForm;

  const onUsuarioSubViewClose = (usuario?: Usuario) => {
    if (usuario?.ativo) {
      setUsuario(usuario);
      setPreenchido(true);
    } else {
      setUsuarioNull("inativo");
    }
  };

  const onSubmit = async (pData: OrdemServico) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Editar") {
        const payload = transformarParaPutOrdemServico(pData);
        await controller.update(payload);
        toast.update(toastId, {
          render: "Ordem de Serviço atualizada com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (action === "Iniciar" || action === "Pausar") {
        const situacao =
          pData.situacao === "Em Andamento" ? "Pausado" : "Em Andamento";
        const pId = pData.id;
        await controller.iniciarPausar(pId, situacao);
        toast.update(toastId, {
          render: "Ordem de Serviço atualizada com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (action === "Entregar") {
        const pId = pData.id;
        await controller.entregar(pId);
        toast.update(toastId, {
          render: "Ordem de Serviço atualizada com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (action === "Postar") {
        const pId = pData.id;
        await controller.postar(pId);
        toast.update(toastId, {
          render: "Ordem de Serviço atualizada com sucesso!",
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
      cliente_id: 0,
      nome_razaoSocial: "",
      contrato_id: 0,
      usuario_id: 0,
      nome: "",
      servico_id: 0,
      servico: "",
      data_prazo: "",
      data_entrega: "",
      tema: "",
      situacao: "",
      postado: "",
      referencia: "",
      data_cadastro: "",
      data_ult_alt: "",
    });
  };

  const loadData = () => {
    reset({
      ...data,
      usuario_id: data.usuario_id === null ? 0 : data.usuario_id,
      nome: data.nome === null ? "" : data.nome,
      data_cadastro: data.data_cadastro
        ? format(new Date(data.data_cadastro), "dd/MM/yyyy HH:mm")
        : "",
      data_ult_alt: data.data_ult_alt
        ? format(new Date(data.data_ult_alt), "dd/MM/yyyy HH:mm")
        : "",
    });
  };

  useEffect(() => {
    if (isOpenModal && action) {
      if (action === "Cadastrar") {
        cleanData();
      } else {
        loadData();
      }
    }
  }, [isOpenModal, action]);

  const getUsuario = async (pId: number) => {
    if (pId != 0) {
      if (usuariosController) {
        try {
          const response = await usuariosController.getOne(pId);
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

  const [preenchido, setPreenchido] = useState<boolean>(false);

  const handlePreenchidoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPreenchido(value.length > 0); // Define como true se houver texto, caso contrário, false
  };

  const setUsuario = (pUsuario: Usuario) => {
    setValue(`usuario_id`, pUsuario.id);
    setValue(`nome`, pUsuario.nome);
  };

  const setUsuarioNull = (str: string) => {
    setValue(`usuario_id`, 0);
    setValue(`nome`, "Física");

    toast(`Usuário ${str}!`, {
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  };

  return (
    <Dialog.Content
      maxWidth={"800px"}
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
      onEscapeKeyDown={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex justify-between">
        <Dialog.Title>{action} Ordem de Serviço</Dialog.Title>
        {preenchido ? (
          <AlertCancelX />
        ) : (
          <Dialog.Close>
            <X />
          </Dialog.Close>
        )}
      </div>
      <FormProvider {...ordensServicoForm}>
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

            <div className="flex gap-3">
              <Form.Field>
                <Form.Label htmlFor="situacao">Situação</Form.Label>
                <Form.Input
                  name="situacao"
                  defaultValue={data.situacao}
                  disabled={true}
                />
                <Form.ErrorMessage field="situacao" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="postado">Postado</Form.Label>
                <Form.Input name="postado" disabled={true} width={100} />
                <Form.ErrorMessage field="postado" />
              </Form.Field>
            </div>
          </div>

          {/* Linha 2 */}
          <div className="flex gap-3">
            <Form.Field>
              <Form.Label htmlFor="contrato_id">Código Contrato</Form.Label>
              <Form.Input
                name="contrato_id"
                placeholder="0"
                max={5}
                width={100}
                defaultValue={data.contrato_id}
                disabled={true}
              />
              <Form.ErrorMessage field="contrato_id" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="cliente_id">Código Cliente</Form.Label>
              <Form.Input
                name="cliente_id"
                placeholder="0"
                max={5}
                width={100}
                defaultValue={data.cliente_id}
                disabled={true}
              />
              <Form.ErrorMessage field="cliente_id" />
            </Form.Field>

            <Form.Field className="flex-1">
              <Form.Label htmlFor="nome_razaoSocial">
                Nome/Razão Social
              </Form.Label>
              <Form.Input
                name="nome_razaoSocial"
                defaultValue={data.nome_razaoSocial}
                disabled={true}
              />
              <Form.ErrorMessage field="nome_razaoSocial" />
            </Form.Field>
          </div>

          <div className="flex gap-3">
            <Form.Field>
              <Form.Label htmlFor="usuario_id">Código Usuário *</Form.Label>
              <Form.Input
                name="usuario_id"
                placeholder="0"
                max={5}
                width={100}
                defaultValue={data.usuario_id}
                onBlur={(e) => getUsuario(Number(e.target.value))}
                disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="usuario_id" />
            </Form.Field>

            <Form.Field>
              <br />
              <UsuariosSubView
                onClose={onUsuarioSubViewClose}
                controller={usuariosController}
                disabled={action === "Visualizar"}
              />
            </Form.Field>

            <Form.Field className="flex-1">
              <Form.Label htmlFor="nome">Nome</Form.Label>
              <Form.Input name="nome" disabled={true} />
              <Form.ErrorMessage field="nome" />
            </Form.Field>
          </div>

          <div className="flex gap-3">
            <Form.Field>
              <Form.Label htmlFor="servico_id">Servico</Form.Label>
              <Form.Input
                name="servico_id"
                placeholder="0"
                max={5}
                width={80}
                defaultValue={data.servico_id}
                disabled={true}
              />
              <Form.ErrorMessage field="servico_id" />
            </Form.Field>

            <Form.Field className="w-full">
              <Form.Label htmlFor="servico">Descrição</Form.Label>
              <Form.Input
                name="servico"
                defaultValue={data.servico}
                disabled={true}
              />
              <Form.ErrorMessage field="servico" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="data_prazo">Prazo *</Form.Label>
              <Datepick
                name="data_prazo"
                days={0}
                disabled={action === "Visualizar"}
              />
              <Form.ErrorMessage field="data_prazo" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="data_entrega">Data de Entrega</Form.Label>
              <Datepick name="data_entrega" days={0} disabled={true} />
              <Form.ErrorMessage field="data_entrega" />
            </Form.Field>
          </div>

          <div className="flex gap-3">
            <Form.Field className="w-full">
              <Form.Label htmlFor="tema">Tema *</Form.Label>
              <Form.Input
                name="tema"
                defaultValue={data.tema}
                max={200}
                placeholder="Tema do serviço"
                disabled={action === "Visualizar"}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="tema" />
            </Form.Field>

            <Form.Field className="w-full">
              <Form.Label htmlFor="referencia">Referência</Form.Label>
              <Form.Input
                name="referencia"
                defaultValue={data.referencia}
                max={255}
                placeholder="Referência do serviço"
                disabled={action === "Visualizar"}
              />
              <Form.ErrorMessage field="referencia" />
            </Form.Field>
          </div>

          <div className="flex gap-3">
            <Form.Field className="w-full">
              <Form.Label htmlFor="observacoes">Observações</Form.Label>
              <TextArea
                {...register("observacoes")}
                maxLength={255}
                placeholder="Adicione aqui as observações"
                className="min-h-24 max-h-24"
                disabled={action === "Visualizar"}
              />
              <Form.ErrorMessage field="observacoes" />
            </Form.Field>
          </div>

          {/* Linha 5 */}
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
              <Form.ErrorMessage field="data_cadastro" />
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
                type="Proposta"
                onSubmit={onSubmit}
                color={
                  action === "Aprovar"
                    ? "green"
                    : action === "Recusar"
                    ? "red"
                    : action === "Cancelar"
                    ? "orange"
                    : undefined
                }
              />
            )}
          </div>
        </form>
      </FormProvider>
    </Dialog.Content>
  );
}

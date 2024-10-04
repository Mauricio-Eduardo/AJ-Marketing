import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../../form";
import { format } from "date-fns";
import { Trash } from "@phosphor-icons/react";
import { DialogProps } from "../DialogProps";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { UsuariosController } from "../../../controllers/usuarios-controller";
import { InteressesController } from "../../../controllers/interesses-controller";
import { RamosAtividadeController } from "../../../controllers/ramosAtividade-controller";
import { ClienteSchema, createClienteSchema } from "./schema";
import { Cliente } from "../../../models/cliente/entity/Cliente";
import { transformarParaPostCliente } from "../../../models/cliente/dto/createCliente.dto";
import { transformarParaPutCliente } from "../../../models/cliente/dto/updateCliente.dto";
import { Usuario } from "../../../models/usuario/entity/Usuario";
import { Interesse } from "../../../models/interesse/entity/Interesse";
import { RamoAtividade } from "../../../models/ramoAtividade/entity/RamoAtividade";
import { OrigensController } from "../../../controllers/origens-controller";
import { Origem } from "../../../models/origem/entity/Origem";
import { OrigensSubView } from "../../../views/origens/subView";
import { CidadesController } from "../../../controllers/cidades-controller";
import { Cidade } from "../../../models/cidade/entity/Cidade";
import { CidadesSubView } from "../../../views/cidades/subView";
import { InteressesSubView } from "../../../views/interesses/subView";
import { RamosAtividadeSubView } from "../../../views/ramosAtividade/subView";
import { UsuariosSubView } from "../../../views/usuarios/subView";
import { ClientesController } from "../../../controllers/clientes-controller";
import { formatCpfCnpj, formatPhone } from "../../form/Formats";
import { AlertCancelX } from "../../form/Alerts";

interface ClienteDialogProps extends DialogProps {
  controller: ClientesController;
  origensController: OrigensController;
  cidadesController: CidadesController;
  usuariosController: UsuariosController;
  interessesController: InteressesController;
  ramosAtividadeController: RamosAtividadeController;
  proposta_id: number | null;
}

export function ClienteDialog({
  data,
  action,
  controller,
  isOpenModal,
  origensController,
  cidadesController,
  usuariosController,
  interessesController,
  ramosAtividadeController,
  onSuccess,
  proposta_id,
}: ClienteDialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const clientesForm = useForm<ClienteSchema>({
    resolver: zodResolver(createClienteSchema),
  });
  const { control, handleSubmit, reset, setValue } = clientesForm;

  const {
    fields: usuariosFields,
    append: usuariosAppend,
    remove: usuariosRemove,
  } = useFieldArray({
    control,
    name: "usuarios",
  });

  const {
    fields: interessesFields,
    append: interessesAppend,
    remove: interessesRemove,
  } = useFieldArray({
    control,
    name: "interesses",
  });

  const {
    fields: ramosFields,
    append: ramosAppend,
    remove: ramosRemove,
  } = useFieldArray({
    control,
    name: "ramos",
  });

  const onCidadeSubViewClose = (cidade?: Cidade) => {
    if (cidade) {
      setCidade(cidade);
    }
  };

  const onOrigemSubViewClose = (origem?: Origem) => {
    if (origem) {
      setOrigem(origem);
    }
  };

  const onUsuarioSubViewClose = (index: number, usuario?: Usuario) => {
    if (usuario) {
      setUsuario(index, usuario);
    }
  };

  const onInteresseSubViewClose = (index: number, interesse?: Interesse) => {
    if (interesse) {
      setInteresse(index, interesse);
    }
  };

  const onRamoAtividadeSubViewClose = (index: number, ramo?: RamoAtividade) => {
    if (ramo) {
      setRamoAtividade(index, ramo);
    }
  };

  const onSubmit = async (pData: Cliente) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Cadastrar") {
        const payload = transformarParaPostCliente(pData);
        await controller.create(payload, proposta_id);
        toast.update(toastId, {
          render: "Cliente cadastrado com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (action === "Editar") {
        const payload = transformarParaPutCliente(pData);
        await controller.update(payload);
        toast.update(toastId, {
          render: "Cliente atualizado com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else {
        const id = pData.id;
        await controller.delete(id);
        toast.update(toastId, {
          render: "Cliente excluído com sucesso!",
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
      tipo_pessoa: "Física",
      cpf_cnpj: "",
      nome_razaoSocial: "",
      apelido_nomeFantasia: "",
      rg_inscricaoEstadual: "",
      genero: "",
      email: "",
      celular: "",
      cidade_id: 0,
      cidade: "",
      estado: "",
      pais: "",
      logradouro: "",
      numero: "",
      bairro: "",
      complemento: "",
      cep: "",
      origem_id: 0,
      origem: "",
      usuarios: [],
      interesses: [],
      ramos: [],
      ativo: true,
      data_cadastro: "",
      data_ult_alt: "",
    });
  };

  const loadData = () => {
    reset({
      ...data,
      cpf_cnpj: formatCpfCnpj(data.cpf_cnpj),
      celular: formatPhone(data.celular),
      data_cadastro: data.data_cadastro
        ? format(new Date(data.data_cadastro), "dd/MM/yyyy HH:mm")
        : "",
      data_ult_alt: data.data_ult_alt
        ? format(new Date(data.data_ult_alt), "dd/MM/yyyy HH:mm")
        : "",
    });
  };

  useEffect(() => {
    if (isOpenModal && proposta_id === null) {
      if (action !== "Cadastrar") {
        loadData();
      } else {
        cleanData();
      }
    } else {
      loadData();
    }
  }, [isOpenModal, action]);

  const handlePessoaChange = () => {
    if (pessoa === "Física") {
      setPessoa("Jurídica");
    } else {
      setPessoa("Física");
    }
  };

  const getCidade = async (pId: number) => {
    if (pId != 0) {
      try {
        const response = await cidadesController.getOne(pId);
        if (response.ativo) {
          setCidade(response);
        } else {
          setCidadeNull();
        }
      } catch (error) {
        setCidadeNull();
        toast("Cidade Inativa ou inexistente", {
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.log(error);
      }
    } else {
      setCidadeNull();
    }
  };

  const setCidade = (pCidade: Cidade) => {
    setValue(`cidade_id`, pCidade.id);
    setValue(`cidade`, pCidade.cidade);
    setValue("estado", pCidade.estado);
    setValue("pais", pCidade.pais);
  };

  const setCidadeNull = () => {
    setValue(`cidade_id`, 0);
    setValue(`cidade`, "");
    setValue("estado", "");
    setValue("pais", "");
  };

  const getOrigem = async (pId: number) => {
    if (pId != 0) {
      try {
        const response = await origensController.getOne(pId);
        if (response.ativo) {
          setOrigem(response);
        } else {
          setOrigemNull();
        }
      } catch (error) {
        setOrigemNull();
        toast("Origem Inativa ou inexistente", {
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.log(error);
      }
    } else {
      setOrigemNull();
    }
  };

  const setOrigem = (pOrigem: Origem) => {
    setValue(`origem_id`, pOrigem.id);
    setValue(`origem`, pOrigem.origem);
  };

  const setOrigemNull = () => {
    setValue(`origem_id`, 0);
    setValue(`origem`, "");
  };

  const getUsuario = async (index: number, pId: number) => {
    if (pId != 0) {
      try {
        const response = await usuariosController.getOne(pId);
        if (response.ativo) {
          setUsuario(index, response);
        } else {
          setUsuarioNull(index);
        }
      } catch (error) {
        setUsuarioNull(index);
        toast("Usuário Inativo ou inexistente", {
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.log(error);
      }
    }
  };

  const setUsuario = (index: number, pUsuario: Usuario) => {
    setValue(`usuarios.${index}.usuario_id`, pUsuario.id);
    setValue(`usuarios.${index}.nome`, pUsuario.nome);
    setValue(`usuarios.${index}.email`, pUsuario.email);
  };

  const setUsuarioNull = (index: number) => {
    setValue(`usuarios.${index}.usuario_id`, 0);
    setValue(`usuarios.${index}.nome`, "");
    setValue(`usuarios.${index}.email`, "");
  };

  const getInteresse = async (index: number, pId: number) => {
    if (pId != 0) {
      try {
        const response = await interessesController.getOne(pId);
        if (response.ativo) {
          setInteresse(index, response);
        } else {
          setInteresseNull(index);
        }
      } catch (error) {
        setInteresseNull(index);
        toast("Interesse Inativo ou inexistente", {
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.log(error);
      }
    }
  };

  const setInteresse = (index: number, pInteresse: Interesse) => {
    setValue(`interesses.${index}.interesse_id`, pInteresse.id);
    setValue(`interesses.${index}.interesse`, pInteresse.interesse);
  };

  const setInteresseNull = (index: number) => {
    setValue(`interesses.${index}.interesse_id`, 0);
    setValue(`interesses.${index}.interesse`, "");
  };

  const getRamoAtividade = async (index: number, pId: number) => {
    if (pId != 0) {
      if (pId != 0) {
        try {
          const response = await ramosAtividadeController.getOne(pId);
          if (response.ativo) {
            setRamoAtividade(index, response);
          } else {
            setRamoAtividadeNull(index);
          }
        } catch (error) {
          setRamoAtividadeNull(index);
          toast("Ramo de Atividade Inativo ou inexistente", {
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          console.log(error);
        }
      }
    }
  };

  const setRamoAtividade = (index: number, pRamoAtividade: RamoAtividade) => {
    setValue(`ramos.${index}.ramo_id`, pRamoAtividade.id);
    setValue(`ramos.${index}.ramo`, pRamoAtividade.ramo);
  };

  const setRamoAtividadeNull = (index: number) => {
    setValue(`ramos.${index}.ramo_id`, 0);
    setValue(`ramos.${index}.ramo`, "");
  };

  const addNewUsuario = () => {
    usuariosAppend({
      usuario_id: 0,
      nome: "",
      email: "",
    });
  };

  const addNewInteresse = () => {
    interessesAppend({
      interesse_id: 0,
      interesse: "",
    });
  };

  const addNewRamo = () => {
    ramosAppend({
      ramo_id: 0,
      ramo: "",
    });
  };

  const [pessoa, setPessoa] = useState<string>("Física" || "Jurídica");

  useEffect(() => {
    if (clientesForm.getValues("tipo_pessoa")) {
      setPessoa(clientesForm.getValues("tipo_pessoa"));
    }
  }, [clientesForm.getValues("tipo_pessoa")]);

  return (
    <Dialog.Content
      maxWidth={"1000px"}
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
      onEscapeKeyDown={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex justify-between">
        <Dialog.Title>Cadastrar Cliente</Dialog.Title>

        <AlertCancelX />
      </div>
      <FormProvider {...clientesForm}>
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
              <Form.Label htmlFor="tipo_pessoa">Tipo Pessoa *</Form.Label>
              <Form.TipoPessoaSelect
                control={control}
                name="tipo_pessoa"
                disabled={action != "Cadastrar"}
                handlePessoaChange={handlePessoaChange}
              />
              <Form.ErrorMessage field="tipo_pessoa" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="cpf_cnpj">
                {pessoa === "Física" ? "CPF *" : "CNPJ *"}
              </Form.Label>
              <Form.Input
                name="cpf_cnpj"
                width={pessoa === "Física" ? 130 : 170}
                max={15}
                defaultValue={data.cpf_cnpj}
                disabled={action != "Cadastrar"}
                maskType={pessoa === "Física" ? "cpf" : "cnpj"}
              />
              <Form.ErrorMessage field="cpf_cnpj" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="nome_razaoSocial">
                {pessoa === "Física" ? "Nome *" : "Razão Social *"}
              </Form.Label>
              <Form.Input
                name="nome_razaoSocial"
                width={pessoa === "Física" ? 610 : 570}
                defaultValue={data.nome_razaoSocial}
                disabled={action === "Excluir"}
              />
              <Form.ErrorMessage field="nome_razaoSocial" />
            </Form.Field>
          </div>

          <div className="flex gap-3">
            <Form.Field>
              <Form.Label htmlFor="apelido_nomeFantasia">
                {pessoa === "Física" ? "Apelido" : "Nome Fantasia"}
              </Form.Label>
              <Form.Input
                name="apelido_nomeFantasia"
                width={250}
                max={50}
                defaultValue={data.apelido_nomeFantasia}
                disabled={action === "Excluir"}
              />
              <Form.ErrorMessage field="apelido_nomeFantasia" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="rg_inscricaoEstadual">
                {pessoa === "Física" ? "RG" : "IE"}
              </Form.Label>
              <Form.Input
                name="rg_inscricaoEstadual"
                width={150}
                max={pessoa === "Física" ? 9 : 14}
                defaultValue={data.rg_inscricaoEstadual}
                disabled={action === "Excluir"}
              />
              <Form.ErrorMessage field="rg_inscricaoEstadual" />
            </Form.Field>

            {pessoa === "Física" && (
              <Form.Field>
                <Form.Label htmlFor="genero">Gênero</Form.Label>
                <Form.GeneroSelect
                  control={control}
                  name="genero"
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="genero" />
              </Form.Field>
            )}
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
                disabled={action === "Excluir"}
              />
              <Form.ErrorMessage field="email" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="celular">Celular *</Form.Label>
              <Form.Input
                name="celular"
                placeholder="(00) 00000-0000"
                maskType="phone"
                max={11}
                width={130}
                defaultValue={data.celular}
                disabled={action === "Excluir"}
              />
              <Form.ErrorMessage field="celular" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="origem_id">Cód. *</Form.Label>
              <Form.Input
                name="origem_id"
                placeholder="0"
                max={5}
                width={70}
                defaultValue={data.origem_id}
                onBlur={(e) => getOrigem(Number(e.target.value))}
                disabled={action === "Excluir"}
              />
              <Form.ErrorMessage field="origem_id" />
            </Form.Field>

            {origensController && (
              <Form.Field>
                <br />
                <OrigensSubView
                  onClose={onOrigemSubViewClose}
                  controller={origensController}
                />
              </Form.Field>
            )}

            <Form.Field>
              <Form.Label htmlFor="origem">Origem</Form.Label>
              <Form.Input
                name="origem"
                placeholder="Selecione o Origem"
                max={56}
                width={250}
                value={data.origem}
                disabled={true}
              />
              <Form.ErrorMessage field="origem" />
            </Form.Field>
          </div>

          {/* Endereço */}
          <div className="flex-col space-y-1">
            <Form.Label htmlFor="">Endereço</Form.Label>
            <div className="flex-col space-y-3 border-2 p-4 rounded-lg">
              <div className="flex gap-3">
                <Form.Field>
                  <Form.Label htmlFor="cidade_id">Cód. *</Form.Label>
                  <Form.Input
                    name="cidade_id"
                    placeholder="0"
                    max={5}
                    width={70}
                    defaultValue={data.cidade_id}
                    onBlur={(e) => getCidade(Number(e.target.value))}
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage field="cidade_id" />
                </Form.Field>

                {cidadesController && (
                  <Form.Field>
                    <br />
                    <CidadesSubView
                      onClose={onCidadeSubViewClose}
                      controller={cidadesController}
                    />
                  </Form.Field>
                )}

                <Form.Field>
                  <Form.Label htmlFor="cidade">Cidade</Form.Label>
                  <Form.Input
                    name="cidade"
                    placeholder="Selecione a Cidade"
                    width={250}
                    value={data.cidade}
                    disabled={true}
                  />
                  <Form.ErrorMessage field="cidade" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="estado">Estado</Form.Label>
                  <Form.Input
                    name="estado"
                    width={200}
                    defaultValue={data.estado}
                    disabled={true}
                  />
                  <Form.ErrorMessage field="estado" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="pais">País</Form.Label>
                  <Form.Input
                    name="pais"
                    placeholder=""
                    width={200}
                    defaultValue={data.pais}
                    disabled={true}
                  />
                  <Form.ErrorMessage field="pais" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="cep">CEP *</Form.Label>
                  <Form.Input
                    name="cep"
                    placeholder="0000-000"
                    max={8}
                    width={100}
                    defaultValue={data.cep}
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage field="cep" />
                </Form.Field>
              </div>

              <div className="flex gap-3">
                <Form.Field>
                  <Form.Label htmlFor="logradouro">Logradouro *</Form.Label>
                  <Form.Input
                    name="logradouro"
                    max={80}
                    width={300}
                    defaultValue={data.logradouro}
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage field="logradouro" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="numero">Número *</Form.Label>
                  <Form.Input
                    name="numero"
                    placeholder=""
                    max={6}
                    width={70}
                    defaultValue={data.numero}
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage field="numero" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="bairro">Bairro *</Form.Label>
                  <Form.Input
                    name="bairro"
                    placeholder=""
                    max={30}
                    width={200}
                    defaultValue={data.bairro}
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage field="bairro" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="complemento">Complemento</Form.Label>
                  <Form.Input
                    name="complemento"
                    placeholder=""
                    max={80}
                    width={300}
                    defaultValue={data.complemento}
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage field="complemento" />
                </Form.Field>
              </div>
            </div>
          </div>

          {/* Interesses */}
          <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
            <div className="flex flex-row gap-3 justify-between">
              <span className="text-sm font-medium">Interesses</span>

              <Form.Field>
                <br />
                <Button
                  type="button"
                  onClick={() => {
                    addNewInteresse();
                  }}
                  disabled={action != "Cadastrar" && action != "Editar"}
                >
                  Adicionar Interesse
                </Button>
              </Form.Field>
            </div>
            {interessesFields.map((field: any, index: any) => (
              <div
                key={field.id}
                className="flex gap-3 items-end border-2 border-gray-200 rounded p-2 justify-center"
              >
                <Form.Field>
                  <Form.Label
                    htmlFor={`interesses.${index}.interesse_id` as const}
                    className="flex flex-col"
                  >
                    Cód.
                  </Form.Label>
                  <Form.Input
                    name={`interesses.${index}.interesse_id` as const}
                    width={70}
                    onBlur={(e) => getInteresse(index, Number(e.target.value))}
                    disabled={action != "Cadastrar" && action != "Editar"}
                  />
                  <Form.ErrorMessage
                    field={`interesses.${index}.interesse_id` as const}
                  />
                </Form.Field>

                {interessesController && (
                  <Form.Field>
                    <br />
                    <InteressesSubView
                      index={index}
                      onClose={onInteresseSubViewClose}
                      controller={interessesController}
                    />
                  </Form.Field>
                )}

                <Form.Field>
                  <Form.Label
                    htmlFor={`interesses.${index}.interesse` as const}
                  >
                    Interesse
                  </Form.Label>
                  <Form.Input
                    name={`interesses.${index}.interesse` as const}
                    placeholder="Selecione o Interesse"
                    max={56}
                    width={250}
                    defaultValue={`data.interesses.${index}.interesse`}
                    disabled={true}
                  />
                  <Form.ErrorMessage
                    field={`interesses.${index}.interesse` as const}
                  />
                </Form.Field>
                <Button
                  type="button"
                  color="red"
                  onClick={() => interessesRemove(index)}
                >
                  <Trash weight="bold" />
                </Button>
              </div>
            ))}
          </div>

          {/* Ramos de Atividade */}
          <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
            <div className="flex flex-row gap-3 justify-between">
              <span className="text-sm font-medium">Ramos de Atividade</span>

              <Form.Field>
                <br />
                <Button
                  type="button"
                  onClick={() => {
                    addNewRamo();
                  }}
                  disabled={action != "Cadastrar" && action != "Editar"}
                >
                  Adicionar Ramo
                </Button>
              </Form.Field>
            </div>
            {ramosFields.map((field: any, index: any) => (
              <div
                key={field.id}
                className="flex gap-3 items-end border-2 border-gray-200 rounded p-2 justify-center"
              >
                <Form.Field>
                  <Form.Label
                    htmlFor={`ramos.${index}.ramo_id` as const}
                    className="flex flex-col"
                  >
                    Cód.
                  </Form.Label>
                  <Form.Input
                    name={`ramos.${index}.ramo_id` as const}
                    width={70}
                    onBlur={(e) =>
                      getRamoAtividade(index, Number(e.target.value))
                    }
                    disabled={action != "Cadastrar" && action != "Editar"}
                  />
                  <Form.ErrorMessage
                    field={`ramos.${index}.ramo_id` as const}
                  />
                </Form.Field>

                {ramosAtividadeController && (
                  <Form.Field>
                    <br />
                    <RamosAtividadeSubView
                      index={index}
                      onClose={onRamoAtividadeSubViewClose}
                      controller={ramosAtividadeController}
                    />
                  </Form.Field>
                )}

                <Form.Field>
                  <Form.Label htmlFor={`ramos.${index}.ramo` as const}>
                    Ramo de Atividade
                  </Form.Label>
                  <Form.Input
                    name={`ramos.${index}.ramo` as const}
                    placeholder="Selecione a Ramo Atividade"
                    max={56}
                    width={250}
                    defaultValue={`data.ramos.${index}.ramo`}
                    disabled={true}
                  />
                  <Form.ErrorMessage field={`ramos.${index}.ramo` as const} />
                </Form.Field>
                <Button
                  type="button"
                  color="red"
                  onClick={() => ramosRemove(index)}
                >
                  <Trash weight="bold" />
                </Button>
              </div>
            ))}
          </div>

          {/* Usuários */}
          <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
            <div className="flex flex-row gap-3 justify-between">
              <span className="text-sm font-medium">Responsáveis *</span>

              <Form.Field>
                <br />
                <Button
                  type="button"
                  onClick={() => {
                    addNewUsuario();
                  }}
                  disabled={action != "Cadastrar" && action != "Editar"}
                >
                  Adicionar Usuário
                </Button>
                <Form.ErrorMessage field="usuarios" />
              </Form.Field>
            </div>
            {usuariosFields.map((field: any, index: any) => (
              <div
                key={field.id}
                className="flex gap-3 items-end border-2 border-gray-200 rounded p-2 justify-center"
              >
                <Form.Field>
                  <Form.Label
                    htmlFor={`usuarios.${index}.usuario_id` as const}
                    className="flex flex-col"
                  >
                    Cód.
                  </Form.Label>
                  <Form.Input
                    name={`usuarios.${index}.usuario_id` as const}
                    width={70}
                    onBlur={(e) => getUsuario(index, Number(e.target.value))}
                    disabled={action != "Cadastrar" && action != "Editar"}
                  />
                  <Form.ErrorMessage
                    field={`usuarios.${index}.usuario_id` as const}
                  />
                </Form.Field>

                {usuariosController && (
                  <Form.Field>
                    <br />
                    <UsuariosSubView
                      index={index}
                      onClose={onUsuarioSubViewClose}
                      controller={usuariosController}
                    />
                  </Form.Field>
                )}

                <Form.Field>
                  <Form.Label htmlFor={`usuarios.${index}.nome` as const}>
                    Usuário
                  </Form.Label>
                  <Form.Input
                    name={`usuarios.${index}.nome` as const}
                    placeholder="Selecione o Usuário"
                    max={56}
                    width={250}
                    defaultValue={`data.usuarios.${index}.nome`}
                    disabled={true}
                  />
                  <Form.ErrorMessage
                    field={`usuarios.${index}.nome` as const}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Label htmlFor={`usuarios.${index}.email` as const}>
                    E-mail
                  </Form.Label>
                  <Form.Input
                    name={`usuarios.${index}.email` as const}
                    max={56}
                    width={250}
                    defaultValue={`data.usuarios.${index}.email`}
                    disabled={true}
                  />
                  <Form.ErrorMessage
                    field={`usuarios.${index}.email` as const}
                  />
                </Form.Field>
                <Button
                  type="button"
                  color="red"
                  onClick={() => usuariosRemove(index)}
                >
                  <Trash weight="bold" />
                </Button>
              </div>
            ))}
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
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Dialog.Close>
            {action === "Excluir" && (
              <Button type="submit" color="red">
                {action}
              </Button>
            )}
            {action != "Excluir" && (
              <Button
                type="submit"
                onClick={() => console.log(clientesForm.getValues())}
              >
                {action}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </Dialog.Content>
  );
}

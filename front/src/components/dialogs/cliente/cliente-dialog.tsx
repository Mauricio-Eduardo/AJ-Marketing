import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../../form";
import { format } from "date-fns";
import { Trash, X } from "@phosphor-icons/react";
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
import { ClientesController } from "../../../controllers/clientes-controller";
import { formatCpfCnpj, formatPhone } from "../../form/Formats";
import { AlertCancel, AlertCancelX, AlertSubmit } from "../../form/Alerts";
import { AxiosError, AxiosResponse } from "axios";

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
  const { control, handleSubmit, reset, setValue, watch } = clientesForm;

  // Acompanhe os contratos
  const contratos = watch("contratos", []);

  // Estado para habilitar/desabilitar o campo "Ativo"
  const [isAtivoDisabled, setIsAtivoDisabled] = useState(false);

  // Use useEffect para monitorar alterações em contratos
  useEffect(() => {
    const possuiContratoVigente = contratos.some(
      (contrato) => contrato.situacao === "Vigente"
    );

    setIsAtivoDisabled(possuiContratoVigente);
  }, [contratos]);

  const { fields: contratosFields } = useFieldArray({
    control,
    name: "contratos",
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
    if (cidade?.ativo) {
      setCidade(cidade);
    } else {
      setCidadeNull("inativa");
    }
  };

  const onOrigemSubViewClose = (origem?: Origem) => {
    if (origem?.ativo) {
      setOrigem(origem);
    } else {
      setOrigemNull("inativa");
    }
  };

  const onInteresseSubViewClose = (index: number, interesse?: Interesse) => {
    if (interesse?.ativo) {
      setInteresse(index, interesse);
    } else {
      setInteresseNull(index, "inativa");
    }
  };

  const onRamoAtividadeSubViewClose = (index: number, ramo?: RamoAtividade) => {
    if (ramo?.ativo) {
      setRamoAtividade(index, ramo);
    } else {
      setRamoAtividadeNull(index, "inativa");
    }
  };

  const [preenchido, setPreenchido] = useState<boolean>(false);

  const handlePreenchidoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPreenchido(value.length > 0); // Define como true se houver texto, caso contrário, false
  };

  const onSubmit = async (pData: Cliente) => {
    let toastId = toast.loading("Processando...");
    let response: AxiosResponse<string> | undefined;

    try {
      if (action === "Cadastrar") {
        const payload = transformarParaPostCliente(pData);
        response = await controller.create(payload);
      } else if (action === "Editar") {
        const payload = transformarParaPutCliente(pData);
        response = await controller.update(payload);
      } else if (action === "Excluir") {
        const id = pData.id;
        response = await controller.delete(id);
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
      contratos: [],
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
      contratos: data.contratos
        ? data.contratos.map((contrato: any) => ({
            ...contrato,
            data_contrato: contrato.data_contrato
              ? format(new Date(contrato.data_contrato), "dd/MM/yyyy")
              : "",
            data_vencimento: contrato.data_vencimento
              ? format(new Date(contrato.data_vencimento), "dd/MM/yyyy")
              : "",
          }))
        : [],
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
          setCidadeNull("inativa");
        }
      } catch (error) {
        setCidadeNull("inexistente");
      }
    } else {
      setCidadeNull("inexistente");
    }
  };

  const setCidade = (pCidade: Cidade) => {
    setValue(`cidade_id`, pCidade.id);
    setValue(`cidade`, pCidade.cidade);
    setValue("estado", pCidade.estado);
    setValue("pais", pCidade.pais);
  };

  const setCidadeNull = (str: string) => {
    setValue(`cidade_id`, 0);
    setValue(`cidade`, "");
    setValue("estado", "");
    setValue("pais", "");

    toast(`Cidade ${str}!`, {
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  };

  const getOrigem = async (pId: number) => {
    if (pId != 0) {
      try {
        const response = await origensController.getOne(pId);
        if (response.ativo) {
          setOrigem(response);
        } else {
          setOrigemNull("inativo");
        }
      } catch (error) {
        setOrigemNull("inexistente");
      }
    } else {
      setOrigemNull("inexistente");
    }
  };

  const setOrigem = (pOrigem: Origem) => {
    setValue(`origem_id`, pOrigem.id);
    setValue(`origem`, pOrigem.origem);
  };

  const setOrigemNull = (str: string) => {
    setValue(`origem_id`, 0);
    setValue(`origem`, "");

    toast(`Origem ${str}!`, {
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  };

  const getInteresse = async (index: number, pId: number) => {
    if (pId != 0) {
      try {
        const response = await interessesController.getOne(pId);
        if (response.ativo) {
          setInteresse(index, response);
        } else {
          setInteresseNull(index, "inativo");
        }
      } catch (error) {
        setInteresseNull(index, "inexistente");
      }
    } else {
      setInteresseNull(index, "inexistente");
    }
  };

  const setInteresse = (index: number, pInteresse: Interesse) => {
    setValue(`interesses.${index}.interesse_id`, pInteresse.id);
    setValue(`interesses.${index}.interesse`, pInteresse.interesse);
  };

  const setInteresseNull = (index: number, str: string) => {
    setValue(`interesses.${index}.interesse_id`, 0);
    setValue(`interesses.${index}.interesse`, "");

    toast(`Interesse ${str}!`, {
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  };

  const getRamoAtividade = async (index: number, pId: number) => {
    if (pId != 0) {
      if (pId != 0) {
        try {
          const response = await ramosAtividadeController.getOne(pId);
          if (response.ativo) {
            setRamoAtividade(index, response);
          } else {
            setRamoAtividadeNull(index, "inativo");
          }
        } catch (error) {
          setRamoAtividadeNull(index, "inexistente");
        }
      } else {
        setRamoAtividadeNull(index, "inexistente");
      }
    }
  };

  const setRamoAtividade = (index: number, pRamoAtividade: RamoAtividade) => {
    setValue(`ramos.${index}.ramo_id`, pRamoAtividade.id);
    setValue(`ramos.${index}.ramo`, pRamoAtividade.ramo);
  };

  const setRamoAtividadeNull = (index: number, str: string) => {
    setValue(`ramos.${index}.ramo_id`, 0);
    setValue(`ramos.${index}.ramo`, "");

    toast(`Ramo de Atividade ${str}!`, {
      type: "error",
      isLoading: false,
      autoClose: 3000,
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

  const [pessoa, setPessoa] = useState<string>("Física");

  useEffect(() => {
    if (clientesForm.getValues("tipo_pessoa")) {
      setPessoa(clientesForm.getValues("tipo_pessoa"));
    }
  }, [clientesForm.getValues("tipo_pessoa")]);

  return (
    <Dialog.Content
      maxWidth={"900px"}
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
      onEscapeKeyDown={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex justify-between">
        <Dialog.Title>{action} Cliente</Dialog.Title>

        {preenchido ? (
          <AlertCancelX />
        ) : (
          <Dialog.Close>
            <X />
          </Dialog.Close>
        )}
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
                disabled={action != "Editar" || isAtivoDisabled}
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
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="cpf_cnpj" />
            </Form.Field>

            <Form.Field className="flex-1">
              <Form.Label htmlFor="nome_razaoSocial">
                {pessoa === "Física" ? "Nome *" : "Razão Social *"}
              </Form.Label>
              <Form.Input
                name="nome_razaoSocial"
                max={50}
                defaultValue={data.nome_razaoSocial}
                disabled={action === "Excluir" || action === "Visualizar"}
                preenchidoChange={handlePreenchidoChange}
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
                disabled={action === "Excluir" || action === "Visualizar"}
                preenchidoChange={handlePreenchidoChange}
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
                disabled={action === "Excluir" || action === "Visualizar"}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="rg_inscricaoEstadual" />
            </Form.Field>

            {pessoa === "Física" && (
              <Form.Field>
                <Form.Label htmlFor="genero">Gênero</Form.Label>
                <Form.GeneroSelect
                  control={control}
                  name="genero"
                  disabled={action === "Excluir" || action === "Visualizar"}
                />
                <Form.ErrorMessage field="genero" />
              </Form.Field>
            )}
          </div>

          {/* Linha 3 */}
          <div className="flex gap-3 items-center">
            <Form.Field className="flex-1">
              <Form.Label htmlFor="email">Email *</Form.Label>
              <Form.Input
                name="email"
                placeholder="exemplo@hotmail.com"
                max={50}
                defaultValue={data.email}
                disabled={action === "Excluir" || action === "Visualizar"}
                preenchidoChange={handlePreenchidoChange}
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
                disabled={action === "Excluir" || action === "Visualizar"}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="celular" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="origem_id">Origem *</Form.Label>
              <Form.Input
                name="origem_id"
                placeholder="0"
                max={4}
                width={100}
                defaultValue={data.origem_id}
                onBlur={(e) => getOrigem(Number(e.target.value))}
                disabled={action === "Excluir" || action === "Visualizar"}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="origem_id" />
            </Form.Field>

            <Form.Field>
              <br />
              <OrigensSubView
                onClose={onOrigemSubViewClose}
                controller={origensController}
                disabled={action === "Excluir" || action === "Visualizar"}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="origem"></Form.Label>
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
                  <Form.Label htmlFor="cidade_id">Cidade *</Form.Label>
                  <Form.Input
                    name="cidade_id"
                    placeholder="0"
                    max={4}
                    width={70}
                    defaultValue={data.cidade_id}
                    onBlur={(e) => getCidade(Number(e.target.value))}
                    disabled={action === "Excluir" || action === "Visualizar"}
                    preenchidoChange={handlePreenchidoChange}
                  />
                  <Form.ErrorMessage field="cidade_id" />
                </Form.Field>

                <Form.Field>
                  <br />
                  <CidadesSubView
                    onClose={onCidadeSubViewClose}
                    controller={cidadesController}
                    disabled={action === "Excluir" || action === "Visualizar"}
                  />
                </Form.Field>

                <Form.Field className="flex-1">
                  <Form.Label htmlFor="cidade"></Form.Label>
                  <Form.Input
                    name="cidade"
                    placeholder="Selecione a Cidade"
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
                    disabled={action === "Excluir" || action === "Visualizar"}
                    preenchidoChange={handlePreenchidoChange}
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
                    disabled={action === "Excluir" || action === "Visualizar"}
                    preenchidoChange={handlePreenchidoChange}
                  />
                  <Form.ErrorMessage field="logradouro" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="numero">Número *</Form.Label>
                  <Form.Input
                    name="numero"
                    placeholder=""
                    max={6}
                    width={100}
                    defaultValue={data.numero}
                    disabled={action === "Excluir" || action === "Visualizar"}
                    preenchidoChange={handlePreenchidoChange}
                  />
                  <Form.ErrorMessage field="numero" />
                </Form.Field>

                <Form.Field className="flex-1">
                  <Form.Label htmlFor="bairro">Bairro *</Form.Label>
                  <Form.Input
                    name="bairro"
                    placeholder=""
                    max={30}
                    defaultValue={data.bairro}
                    disabled={action === "Excluir" || action === "Visualizar"}
                    preenchidoChange={handlePreenchidoChange}
                  />
                  <Form.ErrorMessage field="bairro" />
                </Form.Field>

                <Form.Field className="flex-1">
                  <Form.Label htmlFor="complemento">Complemento</Form.Label>
                  <Form.Input
                    name="complemento"
                    placeholder=""
                    max={80}
                    defaultValue={data.complemento}
                    disabled={action === "Excluir" || action === "Visualizar"}
                    preenchidoChange={handlePreenchidoChange}
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
                  disabled={action === "Excluir" || action === "Visualizar"}
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
                    max={4}
                    width={70}
                    onBlur={(e) => getInteresse(index, Number(e.target.value))}
                    disabled={action != "Cadastrar" && action != "Editar"}
                    preenchidoChange={handlePreenchidoChange}
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
                      disabled={action === "Excluir" || action === "Visualizar"}
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
                  disabled={action === "Excluir" || action === "Visualizar"}
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
                  disabled={action === "Excluir" || action === "Visualizar"}
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
                    max={4}
                    onBlur={(e) =>
                      getRamoAtividade(index, Number(e.target.value))
                    }
                    disabled={action != "Cadastrar" && action != "Editar"}
                    preenchidoChange={handlePreenchidoChange}
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
                      disabled={action === "Excluir" || action === "Visualizar"}
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
                  disabled={action === "Excluir" || action === "Visualizar"}
                >
                  <Trash weight="bold" />
                </Button>
              </div>
            ))}
          </div>

          {/* Contratos */}
          {action != "Cadastrar" && (
            <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
              <div className="flex flex-row gap-3 justify-between">
                <span className="text-sm font-medium">Contratos</span>
              </div>
              {contratosFields.map((field: any, index: any) => (
                <div
                  key={field.id}
                  className="flex gap-3 items-end border-2 border-gray-200 rounded p-2 justify-center"
                >
                  <Form.Field>
                    <Form.Label
                      htmlFor={`contratos.${index}.contrato_id` as const}
                    >
                      Contrato
                    </Form.Label>
                    <Form.Input
                      name={`contratos.${index}.contrato_id` as const}
                      width={70}
                      disabled={true}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label
                      htmlFor={`contratos.${index}.data_contrato` as const}
                    >
                      Data Contrato
                    </Form.Label>
                    <Form.Input
                      name={`contratos.${index}.data_contrato` as const}
                      width={100}
                      defaultValue={`data.contratos.${index}.data_contrato`}
                      disabled={true}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label
                      htmlFor={`contratos.${index}.data_vencimento` as const}
                    >
                      Data Vencimento
                    </Form.Label>
                    <Form.Input
                      name={`contratos.${index}.data_vencimento` as const}
                      width={100}
                      defaultValue={`data.contratos.${index}.data_vencimento`}
                      disabled={true}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label
                      htmlFor={`contratos.${index}.situacao` as const}
                    >
                      Situação
                    </Form.Label>
                    <Form.Input
                      name={`contratos.${index}.situacao` as const}
                      max={56}
                      width={150}
                      defaultValue={`data.contratos.${index}.situacao`}
                      disabled={true}
                    />
                  </Form.Field>
                </div>
              ))}
            </div>
          )}

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
                type="Cliente"
                onSubmit={onSubmit}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </Dialog.Content>
  );
}

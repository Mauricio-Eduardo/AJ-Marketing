import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../../form";
import { addDays, format, formatISO } from "date-fns";
import { createPropostasSchema, PropostasSchema } from "./schema";
import { Trash, X } from "@phosphor-icons/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Proposta } from "../../../models/proposta/entity/Proposta";
import { transformarParaPostProposta } from "../../../models/proposta/dto/createProposta.dto";
import { transformarParaPutProposta } from "../../../models/proposta/dto/updateProposta.dto";
import {
  Servico,
  ServicoProposta,
} from "../../../models/servico/entity/Servico";
import { DialogProps } from "../DialogProps";
import { ServicosSubView } from "../../../views/servicos/subView";
import { Datepick } from "../../form/Datepicker";
import { formatCpfCnpj, formatCurrency } from "../../form/Formats";
import { ServicosController } from "../../../controllers/servicos-controller";
import { ClientesSubView } from "../../../views/clientes/subView";
import { ClientesController } from "../../../controllers/clientes-controller";
import { Cliente } from "../../../models/cliente/entity/Cliente";
import { AlertCancel, AlertCancelX, AlertSubmit } from "../../form/Alerts";
import { CondicoesPagamentoController } from "../../../controllers/condicoesPagamento-controller";
import { CondicaoPagamento } from "../../../models/condicaoPagamento/entity/CondicaoPagamento";
import { CondicoesPagamentoSubView } from "../../../views/condicoesPagamento/subView";
import { transformarParaAtualizarProposta } from "../../../models/proposta/dto/atualizaProposta.dto";
import { PeridiocidadesController } from "../../../controllers/peridiocidades-controller";
import { Peridiocidade } from "../../../models/peridiocidade/entity/Peridiocidade";
import { PeridiocidadesSubView } from "../../../views/peridiocidades/subView";

interface PropostaDialogProps extends DialogProps {
  clientesController: ClientesController;
  condicoesPagamentoController: CondicoesPagamentoController;
  peridiocidadesController: PeridiocidadesController;
  servicosController: ServicosController;
}

export function PropostaDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
  clientesController,
  condicoesPagamentoController,
  peridiocidadesController,
  servicosController,
}: PropostaDialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const propostasForm = useForm<PropostasSchema>({
    resolver: zodResolver(createPropostasSchema),
    shouldFocusError: false,
  });
  const { register, control, handleSubmit, reset, setValue, watch } =
    propostasForm;

  // Aqui define que a variável 'servicos' do zod vai ser usada pelo 'control'
  const { fields, append, remove } = useFieldArray({
    control,
    name: "servicos",
  });

  const addNewServico = () => {
    if (fields.length < 8) {
      append({
        servico_id: 0,
        servico: "",
        quantidade: 0,
        valor_unitario: "0,00",
        desconto: "0,00",
        valor_total: "0,00",
        peridiocidade_id: 0,
        descricao: "",
        dias: 0,
      });
    }
  };

  const onClienteSubViewClose = (cliente?: Cliente) => {
    if (cliente) {
      setCliente(cliente);
      setPreenchido(true);
    }
  };

  const onCondicaoSubViewClose = (condicao?: CondicaoPagamento) => {
    if (condicao) {
      setCondicaoPagamento(condicao);
      setPreenchido(true);
    }
  };

  const onPeridiocidadeSubViewClose = (
    index: number,
    peridiocidade?: Peridiocidade
  ) => {
    if (peridiocidade) {
      setPeridiocidade(index, peridiocidade);
      setPreenchido(true);
    }
  };

  const onServicoSubViewClose = (index: number, servico?: ServicoProposta) => {
    if (servico) {
      setServico(index, servico);
      setPreenchido(true);
    }
  };

  const onSubmit = async (pData: Proposta) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Cadastrar") {
        const payload = transformarParaPostProposta(pData);
        await controller.create(payload);
        toast.update(toastId, {
          render: "Proposta cadastrada com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (action === "Editar") {
        const payload = transformarParaPutProposta(pData);
        await controller.update(payload);
        toast.update(toastId, {
          render: "Proposta atualizada com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else if (["Aprovar", "Recusar", "Cancelar"].includes(action ?? "")) {
        let payload = transformarParaAtualizarProposta(pData);
        payload.situacao =
          action === "Aprovar"
            ? "Aprovada"
            : action === "Recusar"
            ? "Recusada"
            : "Cancelada";

        console.log(payload);

        await controller.atualizarSituacao(payload);
        toast.update(toastId, {
          render: `Proposta ${payload.situacao} com sucesso!`,
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
      condPag_id: 0,
      condicaoPagamento: "",
      cliente_id: 0,
      tipo_pessoa: "",
      cpf_cnpj: "",
      nome_razaoSocial: "",
      prazo_final: formatISO(addDays(new Date(), 30)),
      data_aprovacao: "",
      data_inicio: "",
      total: "0,00",
      situacao: "Pendente",
      servicos: [],
      data_cadastro: "",
      data_ult_alt: "",
    });
  };

  const loadData = () => {
    reset({
      ...data,
      cliente_id: data.cliente_id === null ? 0 : data.cliente_id,
      cpf_cnpj: formatCpfCnpj(data.cpf_cnpj),
      tipo_pessoa: data.tipo_pessoa,
      total: formatCurrency(data.total),
      servicos: data.servicos
        ? data.servicos.map((servico: any) => ({
            ...servico,
            valor_unitario: formatCurrency(servico.valor_unitario),
            desconto: formatCurrency(servico.desconto),
            valor_total: formatCurrency(servico.valor_total),
          }))
        : [],
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
      } else if (action === "Aprovar") {
        loadData();
        setValue("data_inicio", formatISO(new Date()));
        setValue("data_aprovacao", formatISO(new Date()));
      } else {
        loadData();
      }
    }
  }, [isOpenModal, action]);

  const [pessoa, setPessoa] = useState<string>("Física");

  const handleServicoChange = (index: number) => {
    const quantidade = watch(`servicos.${index}.quantidade`) || 0;
    const valorUnitario = parseFloat(
      (watch(`servicos.${index}.valor_unitario`) || "0")
        .toString()
        .replace(/\./g, "")
        .replace(",", ".")
    );
    const desconto = parseFloat(
      (watch(`servicos.${index}.desconto`) || "0")
        .toString()
        .replace(/\./g, "")
        .replace(",", ".")
    );

    const valorServico = quantidade * valorUnitario - desconto;

    setValue(`servicos.${index}.valor_total`, formatCurrency(valorServico));
    calculaTotal();
  };

  // Calcula o valor total de todos os serviços
  const calculaTotal = () => {
    if (fields.length > 0) {
      const total = watch("servicos").reduce((acc, servico) => {
        const quantidade = servico.quantidade || 0;
        const valorUnitario = parseFloat(
          (servico.valor_unitario || "0").replace(/\./g, "").replace(",", ".")
        );
        const desconto = parseFloat(
          (servico.desconto || "0").replace(/\./g, "").replace(",", ".")
        );
        const valorServico = quantidade * valorUnitario - desconto;
        return acc + valorServico;
      }, 0);
      setValue("total", formatCurrency(total));
    } else {
      setValue("total", "0,00");
    }
  };

  const removeServico = (index: number) => {
    remove(index);
    calculaTotal();
  };

  const getServico = async (index: number, pId: number) => {
    if (pId != 0) {
      if (servicosController) {
        try {
          const response = await servicosController.getOne(pId);
          if (response.ativo) {
            setServico(index, response);
          } else {
            setServicoNull(index);
          }
        } catch (error) {
          setServicoNull(index);
          console.log(error);
        }
      }
    }
  };

  const setServico = (index: number, pServico: Servico) => {
    setValue(`servicos.${index}.servico_id`, pServico.id);
    setValue(`servicos.${index}.servico`, pServico.servico);
    setValue(
      `servicos.${index}.valor_unitario`,
      formatCurrency(pServico.valor)
    );
  };

  const setServicoNull = (index: number) => {
    setValue(`servicos.${index}.servico_id`, 0);
    setValue(`servicos.${index}.servico`, "");
    setValue(`servicos.${index}.valor_unitario`, "0,00");
  };

  const getPeridiocidade = async (index: number, pId: number) => {
    if (pId != 0) {
      if (peridiocidadesController) {
        try {
          const response = await peridiocidadesController.getOne(pId);
          if (response.ativo) {
            setPeridiocidade(index, response);
          } else {
            setPeridiocidadeNull(index);
          }
        } catch (error) {
          setPeridiocidadeNull(index);
          console.log(error);
        }
      }
    }
  };

  const setPeridiocidade = (index: number, pPeridiocidade: Peridiocidade) => {
    setValue(`servicos.${index}.peridiocidade_id`, pPeridiocidade.id);
    setValue(`servicos.${index}.descricao`, pPeridiocidade.descricao);
    setValue(`servicos.${index}.dias`, pPeridiocidade.dias);
  };

  const setPeridiocidadeNull = (index: number) => {
    setValue(`servicos.${index}.peridiocidade_id`, 0);
    setValue(`servicos.${index}.descricao`, "");
    setValue(`servicos.${index}.dias`, 0);
  };

  const getCondicao = async (pId: number) => {
    if (pId != 0) {
      if (condicoesPagamentoController) {
        try {
          const response = await condicoesPagamentoController.getOne(pId);
          if (response.ativo) {
            setCondicaoPagamento(response);
          } else {
            setCondicaoPagamentoNull();
          }
        } catch (error) {
          setCondicaoPagamentoNull();
          toast("Condiçãoo Pagamento Inativa ou inexistente", {
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          console.log(error);
        }
      }
    } else {
      setCondicaoPagamentoNull();
    }
  };

  const setCondicaoPagamento = (pCondicaoPagamento: CondicaoPagamento) => {
    setValue(`condPag_id`, pCondicaoPagamento.id);
    setValue(`condicaoPagamento`, pCondicaoPagamento.condicaoPagamento);
  };

  const setCondicaoPagamentoNull = () => {
    setValue("condPag_id", 0);
    setValue("condicaoPagamento", "");
  };

  const getCliente = async (pId: number) => {
    if (pId != 0) {
      if (clientesController) {
        try {
          const response = await clientesController.getOne(pId);
          if (response.ativo) {
            setCliente(response);
          } else {
            setClienteNull();
          }
        } catch (error) {
          setClienteNull();
          toast("Cliente Inativo ou inexistente", {
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          console.log(error);
        }
      }
    } else {
      setClienteNull();
    }
  };

  const [preenchido, setPreenchido] = useState<boolean>(false);

  const handlePreenchidoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPreenchido(value.length > 0); // Define como true se houver texto, caso contrário, false
  };

  const setCliente = (pCliente: Cliente) => {
    setValue(`cliente_id`, pCliente.id);
    setValue(`tipo_pessoa`, pCliente.tipo_pessoa);
    setPessoa(pCliente.tipo_pessoa);
    setValue(`cpf_cnpj`, formatCpfCnpj(pCliente.cpf_cnpj));
    setValue(`nome_razaoSocial`, pCliente.nome_razaoSocial);
  };

  const setClienteNull = () => {
    setValue(`cliente_id`, 0);
    setValue(`tipo_pessoa`, "Física");
    setPessoa("Física");
    setValue(`cpf_cnpj`, "");
    setValue(`nome_razaoSocial`, "");
  };

  return (
    <Dialog.Content
      maxWidth={"1000px"}
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
      onEscapeKeyDown={(e) => {
        e.preventDefault();
      }}
      autoFocus={false}
    >
      <div className="flex justify-between">
        <Dialog.Title>{action} Proposta</Dialog.Title>
        {preenchido && action === "Cadastrar" ? (
          <AlertCancelX />
        ) : (
          <Dialog.Close>
            <X />
          </Dialog.Close>
        )}
      </div>
      <FormProvider {...propostasForm}>
        <form
          className="flex flex-col space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Linha 1 */}
          <div className="flex justify-between">
            {/* <pre>{pessoa}</pre> */}

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
              <Form.Label htmlFor="situacao">Situação *</Form.Label>
              <Form.Input
                name="situacao"
                defaultValue={data.situacao}
                width={100}
                disabled={true}
                textColor={
                  data.situacao === "Aprovada"
                    ? "text-green-500"
                    : data.situacao === "Recusada"
                    ? "text-red-500"
                    : data.situacao === "Cancelada"
                    ? "text-orange-500"
                    : undefined
                }
              />
              <Form.ErrorMessage field="situacao" />
            </Form.Field>
          </div>

          {/* Linha 2 */}
          <div className="flex gap-3">
            <Form.Field>
              <Form.Label htmlFor="cliente_id">Cód. Cliente *</Form.Label>
              <Form.Input
                name="cliente_id"
                placeholder="0"
                max={5}
                width={80}
                defaultValue={data.cliente_id}
                onBlur={(e) => getCliente(Number(e.target.value))}
                disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="cliente_id" />
            </Form.Field>

            <Form.Field>
              <br />
              <ClientesSubView
                onClose={onClienteSubViewClose}
                controller={clientesController}
                disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="tipo_pessoa">Tipo Pessoa</Form.Label>
              <Form.Input name="tipo_pessoa" disabled={true} width={90} />
              <Form.ErrorMessage field="tipo_pessoa" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="cpf_cnpj">
                {pessoa === "Física" ? "CPF" : "CNPJ"}
              </Form.Label>
              <Form.Input
                name="cpf_cnpj"
                width={pessoa === "Física" ? 130 : 170}
                max={15}
                defaultValue={data.cpf_cnpj}
                disabled={true}
                maskType={pessoa === "Física" ? "cpf" : "cnpj"}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="cpf_cnpj" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="nome_razaoSocial">
                {pessoa === "Física" ? "Nome *" : "Razão Social *"}
              </Form.Label>
              <Form.Input
                name="nome_razaoSocial"
                width={pessoa === "Física" ? 475 : 435}
                defaultValue={data.nome_razaoSocial}
                disabled={true}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="nome_razaoSocial" />
            </Form.Field>
          </div>

          <div className="flex gap-3">
            <Form.Field>
              <Form.Label htmlFor="condPag_id">Cód. *</Form.Label>
              <Form.Input
                name="condPag_id"
                placeholder="0"
                max={5}
                width={70}
                defaultValue={data.condPag_id}
                onBlur={(e) => getCondicao(Number(e.target.value))}
                disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="condPag_id" />
            </Form.Field>

            <Form.Field>
              <br />
              <CondicoesPagamentoSubView
                onClose={onCondicaoSubViewClose}
                controller={condicoesPagamentoController}
                disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="condicaoPagamento">
                Condição de Pagamento
              </Form.Label>
              <Form.Input
                name="condicaoPagamento"
                placeholder="..."
                max={56}
                width={250}
                value={data.condicaoPagamento}
                disabled={true}
              />
              <Form.ErrorMessage field="condicaoPagamento" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="prazo_final">Prazo Final</Form.Label>
              <Datepick
                name="prazo_final"
                days={30}
                disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
              />
              <Form.ErrorMessage field="prazo_final" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="data_aprovacao">
                Data de Aprovação
              </Form.Label>
              <Datepick name="data_aprovacao" days={30} disabled={true} />
              <Form.ErrorMessage field="data_aprovacao" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="data_inicio">Data de Início</Form.Label>
              <Datepick
                name="data_inicio"
                days={30}
                disabled={action != "Aprovar"}
              />
              <Form.ErrorMessage field="data_inicio" />
            </Form.Field>
          </div>

          {/* SERVICOS */}
          <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
            <div className="flex gap-3 justify-between">
              <span className="text-sm font-medium">Serviços</span>
              <Form.Field>
                <Form.Label htmlFor="total">Total da Proposta</Form.Label>
                <Form.Input
                  name="total"
                  placeholder="0,00"
                  width={120}
                  defaultValue={data.total}
                  disabled={true}
                ></Form.Input>
                <Form.ErrorMessage field="total" />
              </Form.Field>

              <Form.Field>
                <br />
                <Button
                  type="button"
                  onClick={() => {
                    addNewServico();
                  }}
                  disabled={
                    !["Cadastrar", "Editar"].includes(action ?? "") ||
                    fields.length >= 8
                  }
                >
                  Adicionar Serviço
                </Button>
                <Form.ErrorMessage field="servicos" />
              </Form.Field>
            </div>
            {fields.map((field: any, index: any) => (
              <div
                key={field.id}
                className="flex gap-3 flex-wrap items-end border-2 border-gray-200 rounded p-2 justify-start"
              >
                <Form.Field>
                  <Form.Label
                    htmlFor={`servicos.${index}.servico_id` as const}
                    className="flex flex-col"
                  >
                    Cód. *
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.servico_id` as const}
                    width={70}
                    onBlur={(e) => getServico(index, Number(e.target.value))}
                    disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                  />
                  <Form.ErrorMessage
                    field={`servicos.${index}.servico_id` as const}
                  />
                </Form.Field>

                {servicosController && (
                  <Form.Field>
                    <br />
                    <ServicosSubView
                      index={index}
                      onClose={onServicoSubViewClose}
                      controller={servicosController}
                      disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                    />
                  </Form.Field>
                )}

                <Form.Field>
                  <Form.Label htmlFor={`servicos.${index}.servico` as const}>
                    Serviço *
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.servico` as const}
                    placeholder="Selecione o Serviço"
                    width={350}
                    defaultValue={`data.servicos.${index}.servico`}
                    disabled={true}
                  />

                  <Form.ErrorMessage
                    field={`servicos.${index}.servico` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`servicos.${index}.quantidade` as const}
                    className="flex flex-col"
                  >
                    Qtd. *
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.quantidade` as const}
                    width={50}
                    max={2}
                    disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                    onChange={(e) => {
                      register(
                        `servicos.${index}.quantidade` as const
                      ).onChange(e);
                    }}
                    onBlur={() => handleServicoChange(index)}
                  />
                  <Form.ErrorMessage
                    field={`servicos.${index}.quantidade` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`servicos.${index}.valor_unitario` as const}
                    className="flex flex-col"
                  >
                    Valor Unitário *
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.valor_unitario` as const}
                    width={100}
                    max={9}
                    maskType="money"
                    disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                    onChange={(e) => {
                      register(
                        `servicos.${index}.quantidade` as const
                      ).onChange(e);
                    }}
                    onBlur={() => handleServicoChange(index)}
                  />
                  <Form.ErrorMessage
                    field={`servicos.${index}.valor_unitario` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`servicos.${index}.desconto` as const}
                    className="flex flex-col"
                  >
                    Desconto
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.desconto` as const}
                    width={100}
                    max={9}
                    maskType="money"
                    disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                    onChange={(e) => {
                      register(
                        `servicos.${index}.quantidade` as const
                      ).onChange(e);
                    }}
                    onBlur={() => handleServicoChange(index)}
                  />
                  <Form.ErrorMessage
                    field={`servicos.${index}.desconto` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`servicos.${index}.valor_total` as const}
                    className="flex flex-col"
                  >
                    Valor Total
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.valor_total` as const}
                    width={150}
                    disabled={true}
                  />
                  <Form.ErrorMessage
                    field={`servicos.${index}.valor_total` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`servicos.${index}.peridiocidade_id` as const}
                    className="flex flex-col"
                  >
                    Cód. *
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.peridiocidade_id` as const}
                    width={70}
                    onBlur={(e) =>
                      getPeridiocidade(index, Number(e.target.value))
                    }
                    disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                  />
                  <Form.ErrorMessage
                    field={`servicos.${index}.peridiocidade_id` as const}
                  />
                </Form.Field>

                {peridiocidadesController && (
                  <Form.Field>
                    <br />
                    <PeridiocidadesSubView
                      index={index}
                      onClose={onPeridiocidadeSubViewClose}
                      controller={peridiocidadesController}
                      disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                    />
                  </Form.Field>
                )}

                <Form.Field>
                  <Form.Label htmlFor={`servicos.${index}.descricao` as const}>
                    Peridiocidade *
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.descricao` as const}
                    placeholder="Selecione a Peridiocidade"
                    max={56}
                    width={300}
                    defaultValue={`data.servicos.${index}.descricao`}
                    disabled={true}
                  />

                  <Form.ErrorMessage
                    field={`servicos.${index}.descricao` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`servicos.${index}.quantidade` as const}
                    className="flex flex-col"
                  >
                    Dias
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.dias` as const}
                    width={50}
                    max={2}
                    disabled={true}
                  />
                  <Form.ErrorMessage
                    field={`servicos.${index}.dias` as const}
                  />
                </Form.Field>

                <Button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  type="button"
                  color="red"
                  disabled={!["Cadastrar", "Editar"].includes(action ?? "")}
                  onClick={() => removeServico(index)}
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
                <Button variant="outline">Cancelar</Button>
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

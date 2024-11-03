import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../../form";
import { addDays, formatISO } from "date-fns";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { DialogProps } from "../DialogProps";
import { Datepick } from "../../form/Datepicker";
import { formatCpfCnpj, formatCurrency } from "../../form/Formats";
import { ContratosSchema, createContratosSchema } from "./schema";
import { transformarParaPostContrato } from "../../../models/contrato/dto/createContrato.dto";
import { Contrato } from "../../../models/contrato/entity/Contrato";
import { PropostasController } from "../../../controllers/propostas-controller";
import { Proposta } from "../../../models/proposta/entity/Proposta";
import { PropostasSubView } from "../../../views/propostas/subView";
import { AlertCancel, AlertCancelX, AlertSubmit } from "../../form/Alerts";
import { X } from "@phosphor-icons/react";
import { CondicoesPagamentoController } from "../../../controllers/condicoesPagamento-controller";
import { CondicaoPagamento } from "../../../models/condicaoPagamento/entity/CondicaoPagamento";

interface ContratoDialogProps extends DialogProps {
  propostasController: PropostasController;
  condicoesPagamentoController: CondicoesPagamentoController;
}

export function ContratoDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
  propostasController,
  condicoesPagamentoController,
}: ContratoDialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const contratosForm = useForm<ContratosSchema>({
    resolver: zodResolver(createContratosSchema),
  });
  const { control, handleSubmit, reset, setValue } = contratosForm;

  const [pessoa, setPessoa] = useState<string>("Física");

  // Aqui define que a variável 'servicos' do zod vai ser usada pelo 'control'
  const { fields } = useFieldArray({
    control,
    name: "servicos",
  });

  const onSubmit = async (pData: Contrato) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Cadastrar") {
        const payload = transformarParaPostContrato(pData);
        await controller.create(payload);
        toast.update(toastId, {
          render: "Contrato cadastrado com sucesso!",
          type: "success",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        onSuccess();
      } else {
        const id = pData.id;
        await controller.cancelar(id);
        toast.update(toastId, {
          render: "Contrato cancelado com sucesso!",
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
      cpf_cnpj: "",
      nome_razaoSocial: "",
      proposta_id: 0,
      total: "0,00",
      condicaoPagamento: "",
      data_contrato: "",
      data_vencimento: "",
      situacao: "Vigente",
      servicos: [],
    });
  };

  const loadData = () => {
    reset({
      ...data,
      cpf_cnpj: formatCpfCnpj(data.cpf_cnpj),
      total: formatCurrency(data.total),

      servicos: data.servicos
        ? data.servicos.map((servico: any) => ({
            ...servico,
            valor_unitario: formatCurrency(servico.valor_unitario),
            desconto: formatCurrency(servico.desconto),
            valor_total: formatCurrency(servico.valor_total),
          }))
        : [],
    });
  };

  useEffect(() => {
    if (isOpenModal) {
      if (action !== "Cadastrar") {
        loadData();
      } else {
        cleanData();
        setValue("data_contrato", formatISO(new Date()));
      }
    }
  }, [isOpenModal, action]);

  const [preenchido, setPreenchido] = useState<boolean>(false);

  const handlePreenchidoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPreenchido(value.length > 0); // Define como true se houver texto, caso contrário, false
  };

  const onPropostaSubViewClose = (proposta?: Proposta) => {
    if (proposta) {
      setProposta(proposta);
    }
  };

  const getProposta = async (pId: number) => {
    if (pId != 0) {
      if (propostasController) {
        try {
          const response = await propostasController.getOne(pId);
          if (response.situacao === "Aprovada" && response.data_inicio) {
            setProposta(response);
            getCondicao(response);
          } else if (response.situacao != "Pendente") {
            setPropostaNull();
            toast("Proposta já utilizada!", {
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          } else {
            setPropostaNull();
            toast("Proposta não aprovada!", {
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          }
        } catch (error) {
          setPropostaNull();
          toast("Proposta inexistente!", {
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          console.log(error);
        }
      }
    } else {
      setPropostaNull();
    }
  };

  const calcularDataVencimento = (
    pCondicao: CondicaoPagamento,
    dataInicio: string
  ) => {
    let dias = 0;
    if (pCondicao.parcelas.length > 0) {
      dias = pCondicao.parcelas[pCondicao.parcelas.length - 1].dias;
    }
    console.log(dias);
    const dataVencimento = new Date(addDays(new Date(dataInicio), dias));
    console.log(dataVencimento);
    setValue("data_vencimento", formatISO(String(dataVencimento)));
  };

  const getCondicao = async (pProposta: Proposta) => {
    if (condicoesPagamentoController) {
      try {
        const response = await condicoesPagamentoController.getOne(
          pProposta.condPag_id
        );
        if (response.ativo) {
          calcularDataVencimento(response, String(pProposta.data_inicio));
        } else {
          toast("Condição de Pagamento não possui parcelas!", {
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } catch (error) {
        setPropostaNull();
        toast("Condição de Pagamento inexistente!", {
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.log(error);
      }
    }
  };

  const setProposta = (pProposta: Proposta) => {
    setValue("proposta_id", pProposta.id);
    setValue("cliente_id", pProposta.cliente_id);
    setPessoa(pProposta.tipo_pessoa);
    setValue("tipo_pessoa", pProposta.tipo_pessoa);
    setValue("cpf_cnpj", formatCpfCnpj(pProposta.cpf_cnpj));
    setValue("nome_razaoSocial", pProposta.nome_razaoSocial);
    setValue("condicaoPagamento", pProposta.condicaoPagamento);
    setValue("total", formatCurrency(pProposta.total));
    setValue(
      "servicos",
      pProposta.servicos
        ? pProposta.servicos.map((servico: any) => ({
            ...servico,
            valor_unitario: formatCurrency(servico.valor_unitario),
            desconto: formatCurrency(servico.desconto),
            valor_total: formatCurrency(servico.valor_total),
          }))
        : []
    );
  };

  const setPropostaNull = () => {
    setValue("proposta_id", 0);
    setValue("cliente_id", 0);
    setPessoa("Física");
    setValue("tipo_pessoa", "");
    setValue("cpf_cnpj", "");
    setValue("nome_razaoSocial", "");
    setValue("condicaoPagamento", "");
    setValue("total", "0,00");
    setValue("data_vencimento", "");
    setValue("servicos", []);
    setPreenchido(false);
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
    >
      <div className="flex justify-between">
        <Dialog.Title>{action} Contrato</Dialog.Title>

        {preenchido ? (
          <AlertCancelX />
        ) : (
          <Dialog.Close>
            <X />
          </Dialog.Close>
        )}
      </div>
      <FormProvider {...contratosForm}>
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
              <Form.Label htmlFor="situacao">Situação</Form.Label>
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
                    : undefined
                }
              />
              <Form.ErrorMessage field="situacao" />
            </Form.Field>
          </div>

          {/* Linha 2 */}
          <div className="flex gap-3">
            <Form.Field>
              <Form.Label htmlFor="proposta_id">Código Proposta *</Form.Label>
              <Form.Input
                name="proposta_id"
                placeholder="0"
                max={5}
                width={100}
                defaultValue={data.proposta_id}
                onBlur={(e) => getProposta(Number(e.target.value))}
                disabled={action != "Cadastrar"}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="proposta_id" />
            </Form.Field>

            <Form.Field>
              <br />
              <PropostasSubView
                onClose={onPropostaSubViewClose}
                controller={propostasController}
                disabled={action != "Cadastrar"}
              />
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
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="cliente_id" />
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

            <Form.Field className="flex-1">
              <Form.Label htmlFor="nome_razaoSocial">
                {pessoa === "Física" ? "Nome" : "Razão Social"}
              </Form.Label>
              <Form.Input
                name="nome_razaoSocial"
                defaultValue={data.nome_razaoSocial}
                disabled={true}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="nome_razaoSocial" />
            </Form.Field>
          </div>

          {/* Linha 3 */}
          <div className="flex gap-3">
            <Form.Field>
              <Form.Label htmlFor="data_contrato">Data do Contrato</Form.Label>
              <Datepick
                name="data_contrato"
                days={0}
                end={true}
                disabled={true}
              />
              <Form.ErrorMessage field="data_contrato" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="data_vencimento">Vencimento *</Form.Label>
              <Datepick
                name="data_vencimento"
                days={0}
                minDate={true}
                disabled={action != "Cadastrar"}
              />
              <Form.ErrorMessage field="data_vencimento" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="total">Total</Form.Label>
              <Form.Input
                name="total"
                placeholder="0,00"
                width={100}
                defaultValue={data.total}
                disabled={true}
              ></Form.Input>
              <Form.ErrorMessage field="total" />
            </Form.Field>

            <Form.Field className="flex-1">
              <Form.Label htmlFor="condicaoPagamento">
                Condição de Pagamento
              </Form.Label>
              <Form.Input
                name="condicaoPagamento"
                defaultValue={data.condicaoPagamento}
                disabled={true}
              ></Form.Input>
              <Form.ErrorMessage field="condicaoPagamento" />
            </Form.Field>
          </div>

          {/* SERVICOS */}
          <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
            <div className="flex flex-row gap-3 justify-between">
              <span className="text-sm font-medium">Serviços</span>
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
                    Cód.
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.servico_id` as const}
                    width={70}
                    disabled={true}
                  />
                  <Form.ErrorMessage
                    field={`servicos.${index}.servico_id` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor={`servicos.${index}.servico` as const}>
                    Serviço
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.servico` as const}
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
                    Qtd.
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.quantidade` as const}
                    width={50}
                    max={2}
                    disabled={true}
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
                    Valor Unitário
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.valor_unitario` as const}
                    width={100}
                    max={9}
                    maskType="money"
                    disabled={true}
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
                    disabled={true}
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
                    Cód.
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.peridiocidade_id` as const}
                    width={70}
                    disabled={true}
                  />
                  <Form.ErrorMessage
                    field={`servicos.${index}.peridiocidade_id` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor={`servicos.${index}.descricao` as const}>
                    Peridiocidade
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
              </div>
            ))}
          </div>

          <div className="flex w-full justify-end gap-3">
            {preenchido && action === "Cadastrar" ? (
              <AlertCancel />
            ) : (
              <Dialog.Close>
                <Button variant="outline">Voltar</Button>
              </Dialog.Close>
            )}

            {action != "Visualizar" && (
              <AlertSubmit
                title={action as string}
                type="Contrato"
                onSubmit={onSubmit}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </Dialog.Content>
  );
}

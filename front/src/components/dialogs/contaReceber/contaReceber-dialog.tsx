import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../../form";
import { Trash, X } from "@phosphor-icons/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { DialogProps } from "../DialogProps";
import { Datepick } from "../../form/Datepicker";
import { formatCpfCnpj, formatCurrency } from "../../form/Formats";
import { AlertCancel, AlertCancelX, AlertSubmit } from "../../form/Alerts";
import { ContaReceberSchema, createContaReceberSchema } from "./schema";
import { ContaReceber } from "../../../models/contaReceber/entity/ContaReceber";
import { FormasPagamentoController } from "../../../controllers/formasPagamento-controller.tsx";
import { FormaPagamento } from "../../../models/formaPagamento/entity/FormaPagamento.ts";
import { FormasPagamentoSubView } from "../../../views/formasPagamento/subView/index.tsx";
import { transformarParaReceberContaReceber } from "../../../models/contaReceber/dto/receberContaReceber.dto.ts";
import { differenceInDays, formatISO } from "date-fns";

interface ContaReceberDialogProps extends DialogProps {
  formasPagamentoController: FormasPagamentoController;
}

export function ContaReceberDialog({
  data,
  action,
  controller,
  formasPagamentoController,
  isOpenModal,
  onSuccess,
}: ContaReceberDialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const contasReceberForm = useForm<ContaReceberSchema>({
    resolver: zodResolver(createContaReceberSchema),
  });
  const { control, handleSubmit, reset, setValue, watch } = contasReceberForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recebimentos",
  });

  const [pessoa, setPessoa] = useState<string>("Física");

  const [recebido, setRecebido] = useState<string>("0,00");
  const [receber, setReceber] = useState<string>("0,00");
  const [jurosRecebido, setJurosRecebido] = useState<string>("0,00");
  const [multaRecebida, setMultaRecebida] = useState<string>("0,00");
  const [descontosConcedidos, setDescontosConcedidos] =
    useState<string>("0,00");

  const [receberDisabled, setReceberDisabled] = useState<boolean>(false);

  // Observe mudanças nos campos de "recebimentos"
  const recebimentosValues = watch("recebimentos");

  // Executa o cálculo quando há alterações nos recebimentos
  useEffect(() => {
    if (recebimentosValues) {
      calculo();
    }
  }, [recebimentosValues]);

  const calculaReceberRecebidos = () => {
    let totalReceb = 0;
    let jurosReceb = 0;
    let multaReceb = 0;
    let descontosConced = 0;

    fields.forEach((field) => {
      const recebidoValor = field.recebido
        ? parseFloat(field.recebido.replace(",", "."))
        : 0;
      const jurosRecebidoValor = field.juros
        ? parseFloat(field.juros.replace(",", "."))
        : 0;
      const multaRecebidaValor = field.multa
        ? parseFloat(field.multa.replace(",", "."))
        : 0;
      const descontosConcedidosValor = field.desconto
        ? parseFloat(field.desconto.replace(",", "."))
        : 0;

      totalReceb += recebidoValor;
      jurosReceb += jurosRecebidoValor;
      multaReceb += multaRecebidaValor;
      descontosConced += descontosConcedidosValor;
    });

    const totalReceber = data.total - totalReceb;

    console.log(data.total);
    console.log(totalReceb);
    console.log(totalReceber);

    setRecebido(formatCurrency(totalReceb));
    setJurosRecebido(formatCurrency(jurosReceb));
    setMultaRecebida(formatCurrency(multaReceb));
    setDescontosConcedidos(formatCurrency(descontosConced));
    setReceber(formatCurrency(totalReceber));
  };

  const calculo = () => {
    fields.forEach((field, index) => {
      if (index === fields.length - 1) {
        const dataVencimento = new Date(
          contasReceberForm.getValues("data_vencimento")
        );
        const dataRecebimento = new Date(
          contasReceberForm.getValues(`recebimentos.${index}.data_recebimento`)
        );

        const dias = differenceInDays(dataRecebimento, dataVencimento);

        const recebido = field.recebido
          ? parseFloat(field.recebido.replace(",", "."))
          : 0;

        let juros = 0;
        let multa = 0;
        let desconto = recebido * (data.desconto / 100);

        if (dias > 0) {
          juros = recebido * ((data.juros / 100) * dias);
          multa = recebido * (data.multa / 100);
        }

        setValue(`recebimentos.${index}.juros`, formatCurrency(juros));
        setValue(`recebimentos.${index}.multa`, formatCurrency(multa));
        setValue(`recebimentos.${index}.desconto`, formatCurrency(desconto));

        const total = recebido + (juros + multa - desconto);
        setValue(`recebimentos.${index}.total`, formatCurrency(total));
      }
    });
  };

  useEffect(() => {
    const subscription = watch(() => calculo());
    return () => subscription.unsubscribe();
  }, [watch]);

  const addRecebimento = () => {
    setReceberDisabled(true);

    append({
      formaPag_id: data.formaPag_id,
      formaPagamento: data.formaPagamento,
      recebido: receber,
      juros: "0,00",
      multa: "0,00",
      desconto: "0,00",
      total: "0,00",
      data_recebimento: formatISO(new Date()),
    });
  };

  const removeRecebimento = (index: number) => {
    setReceberDisabled(false);
    remove(index);
  };

  const [preenchido, setPreenchido] = useState<boolean>(false);
  const handlePreenchidoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPreenchido(value.length > 0); // Define como true se houver texto, caso contrário, false
  };

  const onFormaPagamentoSubViewClose = (
    index: number,
    forma?: FormaPagamento
  ) => {
    if (forma) {
      setFormaPagamento(index, forma);
    }
  };

  const getFormaPagamento = async (index: number, pId: number) => {
    if (pId != 0) {
      if (formasPagamentoController) {
        try {
          const response = await formasPagamentoController.getOne(pId);
          if (response.ativo) {
            setFormaPagamento(index, response);
          } else {
            setFormaPagamentoNull(index);
          }
        } catch (error) {
          setFormaPagamentoNull(index);
          toast("Cliente Inativo ou inexistente", {
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          console.log(error);
        }
      } else {
        setFormaPagamentoNull(index);
      }
    }
  };

  const setFormaPagamento = (
    index: number,
    pFormaPagamento: FormaPagamento
  ) => {
    setValue(`recebimentos.${index}.formaPag_id`, pFormaPagamento.id);
    setValue(
      `recebimentos.${index}.formaPagamento`,
      pFormaPagamento.formaPagamento
    );
  };

  const setFormaPagamentoNull = (index: number) => {
    setValue(`recebimentos.${index}.formaPag_id`, 0);
    setValue(`recebimentos.${index}.formaPagamento`, "");
  };

  const onSubmit = async (pData: ContaReceber) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Receber") {
        const id = pData.id;
        let pReceber = 0;
        fields.forEach((field) => {
          const totalRecebido = field.recebido
            ? parseFloat(field.recebido.replace(",", "."))
            : 0;
          pReceber = data.total - totalRecebido;
        });
        const payload = transformarParaReceberContaReceber(
          id,
          String(pReceber),
          pData
        );
        await controller.receber(payload);
        toast.update(toastId, {
          render: "Conta recebida com sucesso!",
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
      situacao: "Pendente",
      cliente_id: 0,
      cpf_cnpj: "",
      nome_razaoSocial: "",
      contrato_id: 0,
      parcela_id: 0,
      numeroParcela: 0,
      quantidadeParcelas: 0,
      total: "0,00",
      data_vencimento: "",
    });
  };

  const loadData = () => {
    calculo();
    calculaReceberRecebidos();

    if (String(data.cpf_cnpj).length > 11) {
      setPessoa("Jurídica");
    } else {
      setPessoa("Física");
    }
    reset({
      ...data,
      cpf_cnpj: formatCpfCnpj(data.cpf_cnpj),
      juros: `${formatCurrency(data.juros)} %`,
      multa: `${formatCurrency(data.multa)} %`,
      desconto: `${formatCurrency(data.desconto)} %`,
      total: formatCurrency(data.total),
      recebimentos: data.recebimentos
        ? data.recebimentos.map((recebimento: any) => ({
            ...recebimento,
            recebido: formatCurrency(recebimento.recebido),
            jurosRecebido: jurosRecebido,
            juros: formatCurrency(recebimento.juros),
            multa: formatCurrency(recebimento.multa),
            desconto: formatCurrency(recebimento.desconto),
            total: formatCurrency(recebimento.total),
          }))
        : [],
    });
  };

  useEffect(() => {
    if (isOpenModal && action) {
      // calculaReceber();
      if (action === "Cadastrar") {
        cleanData();
      } else {
        loadData();
      }
    }
  }, [isOpenModal, action]);

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
        <Dialog.Title>{action} Conta</Dialog.Title>
        {preenchido && action === "Cadastrar" ? (
          <AlertCancelX />
        ) : (
          <Dialog.Close>
            <X />
          </Dialog.Close>
        )}
      </div>
      <FormProvider {...contasReceberForm}>
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
              <Form.Label htmlFor="situacao">Situação *</Form.Label>
              <Form.Input
                name="situacao"
                defaultValue={data.situacao}
                width={110}
                disabled={true}
                textColor={
                  data.situacao === "Paga"
                    ? "text-green-500"
                    : data.situacao === "Pendente"
                    ? "text-red-500"
                    : data.situacao === "Parcial"
                    ? "text-orange-500"
                    : undefined
                }
              />
              <Form.ErrorMessage field="situacao" />
            </Form.Field>
          </div>

          {/* Linha 2 */}
          <div className="flex gap-3">
            {action != "Cadastrar" && (
              <Form.Field>
                <Form.Label htmlFor="contrato_id">Contrato</Form.Label>
                <Form.Input
                  name="contrato_id"
                  placeholder="0"
                  max={5}
                  width={80}
                  defaultValue={data.contrato_id}
                  disabled={true}
                />
                <Form.ErrorMessage field="cliente_id" />
              </Form.Field>
            )}

            <Form.Field>
              <Form.Label htmlFor="cliente_id">Cliente</Form.Label>
              <Form.Input
                name="cliente_id"
                placeholder="0"
                max={5}
                width={80}
                defaultValue={data.cliente_id}
                disabled={action != "Cadastrar"}
              />
              <Form.ErrorMessage field="cliente_id" />
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
                {pessoa === "Física" ? "Nome" : "Razão Social"}
              </Form.Label>
              <Form.Input
                name="nome_razaoSocial"
                width={pessoa === "Física" ? 380 : 340}
                defaultValue={data.nome_razaoSocial}
                disabled={true}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="nome_razaoSocial" />
            </Form.Field>
          </div>

          <div className="flex gap-3">
            <Form.Field>
              <Form.Label htmlFor="parcela">Parcela</Form.Label>
              <Form.Input
                name="parcela"
                placeholder="0/0"
                width={70}
                value={`${data.numeroParcela}/${data.quantidadeParcelas}`}
                disabled={true}
              />
              <Form.ErrorMessage field="numeroParcela" />
              <Form.ErrorMessage field="quantidadeParcelas" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="formaPag_id">Forma de Pag.</Form.Label>
              <Form.Input
                name="formaPag_id"
                placeholder="0"
                width={70}
                defaultValue={data.formaPag_id}
                disabled={true}
              />
              <Form.ErrorMessage field="formaPag_id" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="formaPagamento"></Form.Label>
              <Form.Input
                name="formaPagamento"
                placeholder="0"
                max={5}
                width={200}
                defaultValue={data.formaPagamento}
                disabled={true}
              />
              <Form.ErrorMessage field="formaPagamento" />
            </Form.Field>
          </div>

          <div className="flex gap-3 justify-between">
            <Form.Field>
              <Form.Label htmlFor="data_vencimento">Vencimento</Form.Label>
              <Datepick
                name="data_vencimento"
                days={30}
                disabled={action != "Cadastrar"}
              />
              <Form.ErrorMessage field="data_vencimento" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="total">Total</Form.Label>
              <Form.Input
                name="total"
                width={100}
                placeholder="0,00"
                defaultValue={data.total}
                disabled={true}
                maskType="percentage"
              />
              <Form.ErrorMessage field="total" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="juros">% Juros</Form.Label>
              <Form.Input
                name="juros"
                width={100}
                defaultValue={data.juros}
                disabled={true}
                maskType="percentage"
              />
              <Form.ErrorMessage field="juros" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="multa">% Multa</Form.Label>
              <Form.Input
                name="multa"
                width={100}
                placeholder="0,00"
                defaultValue={data.multa}
                disabled={true}
                maskType="percentage"
              />
              <Form.ErrorMessage field="multa" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="desconto">% Desconto</Form.Label>
              <Form.Input
                name="desconto"
                width={100}
                placeholder="0,00"
                defaultValue={data.desconto}
                disabled={true}
                maskType="percentage"
              />
              <Form.ErrorMessage field="desconto" />
            </Form.Field>
          </div>

          <div className="flex gap-3 justify-between border-2 p-4 rounded-lg">
            <Form.Field>
              <Form.Label>Valor Recebido</Form.Label>
              <Form.Input
                name="recebido"
                width={100}
                value={recebido}
                disabled={true}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Juros</Form.Label>
              <Form.Input
                name="jurosRecebido"
                width={100}
                value={jurosRecebido}
                disabled={true}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Multa</Form.Label>
              <Form.Input
                name="multaRecebida"
                width={100}
                value={multaRecebida}
                disabled={true}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Descontos</Form.Label>
              <Form.Input
                name="descontosConcedidos"
                width={100}
                value={descontosConcedidos}
                disabled={true}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Valor a Receber</Form.Label>
              <Form.Input
                name="receber"
                width={100}
                value={receber}
                disabled={true}
              />
            </Form.Field>
          </div>

          {/* RECEBIMENTOS */}
          <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
            <div className="flex flex-row gap-3 justify-between">
              <span className="text-sm font-medium">Recebimentos</span>

              <Form.Field>
                <br />
                <Button
                  type="button"
                  onClick={() => {
                    addRecebimento();
                  }}
                  disabled={receberDisabled}
                >
                  Receber
                </Button>
              </Form.Field>
            </div>
            {fields.map((field: any, index: any) => (
              <div
                key={field.id}
                className="flex gap-3 flex-wrap items-end border-2 border-gray-200 rounded p-2 justify-start"
              >
                <Form.Field>
                  <Form.Label
                    htmlFor={`recebimentos.${index}.formaPag_id` as const}
                    className="flex flex-col"
                  >
                    Forma Pag. *
                  </Form.Label>
                  <Form.Input
                    name={`recebimentos.${index}.formaPag_id` as const}
                    width={70}
                    onBlur={(e) =>
                      getFormaPagamento(index, Number(e.target.value))
                    }
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage
                    field={`recebimentos.${index}.formaPag_id` as const}
                  />
                </Form.Field>

                {formasPagamentoController && (
                  <Form.Field>
                    <br />
                    <FormasPagamentoSubView
                      index={0}
                      onClose={onFormaPagamentoSubViewClose}
                      controller={formasPagamentoController}
                    />
                  </Form.Field>
                )}

                <Form.Field>
                  <Form.Label htmlFor={`formaPagamento` as const}>
                    Descrição
                  </Form.Label>
                  <Form.Input
                    name={`recebimentos.${index}.formaPagamento` as const}
                    placeholder="Selecione"
                    max={56}
                    width={250}
                    defaultValue={data.formaPagamento}
                    disabled={true}
                  />
                  <Form.ErrorMessage
                    field={`recebimentos.${index}.formaPagamento` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`recebimentos.${index}.data_recebimento` as const}
                  >
                    Recebimento
                  </Form.Label>
                  <Datepick
                    name={`recebimentos.${index}.data_recebimento` as const}
                    days={0}
                    end={true}
                    disabled={action != "Receber"}
                    onBlur={calculo}
                  />
                  <Form.ErrorMessage
                    field={`recebimentos.${index}.data_recebimento` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`recebimentos.${index}.recebido` as const}
                    className="flex flex-col"
                  >
                    Recebido
                  </Form.Label>
                  <Form.Input
                    name={`recebimentos.${index}.recebido` as const}
                    width={100}
                    maskType="money"
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage
                    field={`recebimentos.${index}.recebido` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`recebimentos.${index}.juros` as const}
                    className="flex flex-col"
                  >
                    Juros
                  </Form.Label>
                  <Form.Input
                    name={`recebimentos.${index}.juros` as const}
                    width={100}
                    maskType="money"
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage
                    field={`recebimentos.${index}.juros` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`recebimentos.${index}.multa` as const}
                    className="flex flex-col"
                  >
                    Multa
                  </Form.Label>
                  <Form.Input
                    name={`recebimentos.${index}.multa` as const}
                    width={100}
                    maskType="money"
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage
                    field={`recebimentos.${index}.multa` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`recebimentos.${index}.desconto` as const}
                    className="flex flex-col"
                  >
                    Desconto
                  </Form.Label>
                  <Form.Input
                    name={`recebimentos.${index}.desconto` as const}
                    width={100}
                    maskType="money"
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage
                    field={`recebimentos.${index}.desconto` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`recebimentos.${index}.total` as const}
                    className="flex flex-col"
                  >
                    Total
                  </Form.Label>
                  <Form.Input
                    name={`recebimentos.${index}.total` as const}
                    width={100}
                    maskType="money"
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage
                    field={`recebimentos.${index}.total` as const}
                  />
                </Form.Field>

                <Button
                  type="button"
                  color="red"
                  onClick={() => removeRecebimento(index)}
                >
                  <Trash weight="bold" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex w-full justify-end gap-3">
            {preenchido && action === "Receber" ? (
              <AlertCancel />
            ) : (
              <Dialog.Close>
                <Button variant="outline">Cancelar</Button>
              </Dialog.Close>
            )}

            {action != "Visualizar" && (
              <AlertSubmit
                // title={action as string}
                title={"Salvar"}
                type="Contrato"
                onSubmit={onSubmit}
                color={action === "Receber" ? "green" : undefined}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </Dialog.Content>
  );
}

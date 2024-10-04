import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../../form";
import { addDays, format, formatISO } from "date-fns";
import { Trash, X } from "@phosphor-icons/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Proposta } from "../../../models/proposta/entity/Proposta";
import { transformarParaPostProposta } from "../../../models/proposta/dto/createProposta.dto";
import { transformarParaPutProposta } from "../../../models/proposta/dto/updateProposta.dto";
import { Servico } from "../../../models/servico/entity/Servico";
import { DialogProps } from "../DialogProps";
import { ServicosSubView } from "../../../views/servicos/subView";
import { Datepick } from "../../form/Datepicker";
import { formatCpfCnpj, formatCurrency } from "../../form/Formats";

import {
  AlertCancel,
  AlertCancelX,
  AlertConfirm,
  AlertSubmit,
} from "../../form/Alerts";
import { ContaReceberSchema, createContaReceberSchema } from "./schema";
import { transformarParaPutContaReceber } from "../../../models/contaReceber/dto/updateContaReceber.DTO";
import { ContaReceber } from "../../../models/contaReceber/entity/ContaReceber";

export function ContaReceberDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
}: DialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const contasReceberForm = useForm<ContaReceberSchema>({
    resolver: zodResolver(createContaReceberSchema),
  });
  const { register, control, handleSubmit, reset, setValue, watch } =
    contasReceberForm;

  const [preenchido, setPreenchido] = useState<boolean>(false);
  const handlePreenchidoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPreenchido(value.length > 0); // Define como true se houver texto, caso contrário, false
  };

  const [isDisabled, setIsDisabled] = useState({
    id: true,
    cliente_id: true,
    cpf_cnpj: true,
    nome_razaoSocial: true,
    contrato_id: true,
    parcela_id: true,
    numeroParcela: true,
    quantidadeParcelas: true,
    data_vencimento: false,
    valor_inicial: true,
    desconto: false,
    juros: false,
    multa: false,
    total: true,
    valor_pago: false,
    valor_aberto: true,
    data_recebimento: false,
  });

  const onSubmit = async (pData: ContaReceber) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Receber" || action === "Editar") {
        const payload = transformarParaPutContaReceber(pData);
        await controller.update(payload);
        toast.update(toastId, {
          render:
            action === "Receber"
              ? "Proposta recebida com sucesso!"
              : "Conta atualizada com sucesso!",
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
      cpf_cnpj: "",
      nome_razaoSocial: "",
      contrato_id: 0,
      parcela_id: 0,
      numeroParcela: 0,
      quantidadeParcelas: 0,
      data_vencimento: "",
      valor_inicial: "0,00",
      desconto: "0,00",
      juros: "0,00",
      multa: "0,00",
      total: "0,00",
      valor_pago: "0,00",
      valor_aberto: "0,00",
      data_recebimento: "",
    });
  };

  const loadData = () => {
    reset({
      ...data,
      cpf_cnpj: formatCpfCnpj(data.cpf_cnpj),
      desconto: formatCurrency(data.desconto),
      valor_inicial: formatCurrency(data.valor_inicial),
      juros: formatCurrency(data.juros),
      multa: formatCurrency(data.multa),
      valor_pago: formatCurrency(data.valor_pago),
      valor_aberto: formatCurrency(data.valor_aberto),

      data_vencimento: data.data_vencimento
        ? format(new Date(data.data_vencimento), "dd/MM/yyyy HH:mm")
        : "",
      data_recebimento: data.data_recebimento
        ? format(new Date(data.data_recebimento), "dd/MM/yyyy HH:mm")
        : "",
    });
  };

  useEffect(() => {
    if (isOpenModal && action) {
      if (action === "Cadastrar") {
        cleanData();
      } else if (["Receber", "Editar"].includes(action)) {
        loadData();
      }
    }
  }, [isOpenModal, action]);

  // const handleValorChange = () => {
  //   const quantidade = watch(`servicos.${index}.quantidade`) || 0;
  //   const valorUnitario = parseFloat(
  //     (watch(`servicos.${index}.valor_unitario`) || "0")
  //       .toString()
  //       .replace(/\./g, "")
  //       .replace(",", ".")
  //   );
  //   const desconto = parseFloat(
  //     (watch(`servicos.${index}.desconto`) || "0")
  //       .toString()
  //       .replace(/\./g, "")
  //       .replace(",", ".")
  //   );

  //   const valorServico = quantidade * valorUnitario - desconto;

  //   setValue(`servicos.${index}.valor_total`, formatCurrency(valorServico));
  //   calculaTotal();
  // };

  // // Calcula o valor total de todos os serviços
  // const calculaTotal = () => {
  //   if (fields.length > 0) {
  //     const total = watch("servicos").reduce((acc, servico) => {
  //       const quantidade = servico.quantidade || 0;
  //       const valorUnitario = parseFloat(
  //         (servico.valor_unitario || "0").replace(/\./g, "").replace(",", ".")
  //       );
  //       const desconto = parseFloat(
  //         (servico.desconto || "0").replace(/\./g, "").replace(",", ".")
  //       );
  //       const valorServico = quantidade * valorUnitario - desconto;
  //       return acc + valorServico;
  //     }, 0);
  //     setValue("total", formatCurrency(total));
  //   } else {
  //     setValue("total", "0,00");
  //   }
  // };

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
        <Dialog.Title>{action} Proposta</Dialog.Title>
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
                width={100}
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
            <Form.Field>
              <Form.Label htmlFor="contrato_id">Cód. Contrato</Form.Label>
              <Form.Input
                name="contrato_id"
                placeholder="0"
                max={5}
                width={80}
                defaultValue={data.contrato_id}
                disabled={isDisabled.contrato_id}
              />
              <Form.ErrorMessage field="cliente_id" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="cliente_id">Cód. Cliente</Form.Label>
              <Form.Input
                name="cliente_id"
                placeholder="0"
                max={5}
                width={80}
                defaultValue={data.cliente_id}
                disabled={isDisabled.cliente_id}
              />
              <Form.ErrorMessage field="cliente_id" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="nome_razaoSocial">Cliente</Form.Label>
              <Form.Input
                name="nome_razaoSocial"
                width={475}
                defaultValue={data.nome_razaoSocial}
                disabled={isDisabled.nome_razaoSocial}
              />
              <Form.ErrorMessage field="nome_razaoSocial" />
            </Form.Field>
          </div>

          <div className="flex gap-3">
            <Form.Field>
              <Form.Label htmlFor="numeroParcela">N. Parcela</Form.Label>
              <Form.Input
                name="numeroParcela"
                placeholder="0"
                max={5}
                width={50}
                defaultValue={data.numeroParcela}
                disabled={isDisabled.numeroParcela}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="numeroParcela" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="quantidadeParcelas">
                Qtd. Parcelas
              </Form.Label>
              <Form.Input
                name="quantidadeParcelas"
                placeholder="0"
                max={5}
                width={50}
                defaultValue={data.quantidadeParcelas}
                disabled={isDisabled.quantidadeParcelas}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field="quantidadeParcelas" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="data_vencimento">Vencimento</Form.Label>
              <Datepick
                name="data_vencimento"
                days={30}
                disabled={isDisabled.data_vencimento}
              />
              <Form.ErrorMessage field="data_vencimento" />
            </Form.Field>
          </div>

          {/* Linha 4 */}
          <div className="flex justify-between m-10">
          <Form.Field>
                <Form.Label htmlFor="valor_inicial">Total da Proposta</Form.Label>
                <Form.Input
                  name="valor_inicial"
                  placeholder="0,00"
                  width={120}
                  defaultValue={data.valor_inicial}
                  disabled={true}
                ></Form.Input>
                <Form.ErrorMessage field="valor_inicial" />
              </Form.Field>
          </div>

          {/* SERVICOS */}
          <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
            <div className="flex flex-row gap-3 justify-between">
              <span className="text-sm font-medium">Serviços</span>
              

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
                    onBlur={(e) => getServico(index, Number(e.target.value))}
                    disabled={isDisabled.servicos.servico_id}
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
                      disabled={isDisabled.rest}
                    />
                  </Form.Field>
                )}

                <Form.Field>
                  <Form.Label htmlFor={`servicos.${index}.servico` as const}>
                    Serviço
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.servico` as const}
                    placeholder="Selecione o Serviço"
                    max={56}
                    width={200}
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
                    disabled={isDisabled.servicos.quantidade}
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
                    Valor Unitário
                  </Form.Label>
                  <Form.Input
                    name={`servicos.${index}.valor_unitario` as const}
                    width={100}
                    max={9}
                    maskType="money"
                    disabled={isDisabled.servicos.valor_unitario}
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
                    disabled={isDisabled.servicos.desconto}
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

                <Button
                  type="button"
                  color="red"
                  disabled={isDisabled.rest}
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
            {preenchido && action === "Cadastrar" ? (
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

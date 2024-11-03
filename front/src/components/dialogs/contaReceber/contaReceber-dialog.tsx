import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../form";
import { X } from "@phosphor-icons/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { DialogProps } from "../DialogProps";
import { Datepick } from "../../form/Datepicker";
import {
  formatCpfCnpj,
  formatCurrency,
  formatToDecimal,
} from "../../form/Formats";
import { AlertCancel, AlertCancelX, AlertSubmit } from "../../form/Alerts";
import { ContaReceberSchema, createContaReceberSchema } from "./schema";
import { ContaReceber } from "../../../models/contaReceber/entity/ContaReceber";
import { differenceInDays, formatISO } from "date-fns";
import { transformarParaPutContaReceber } from "../../../models/contaReceber/dto/receberContaReceber.dto.ts";

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
  const { register, handleSubmit, reset, setValue, watch } = contasReceberForm;

  const [pessoa, setPessoa] = useState<string>("Física");

  const handleValorChange = () => {
    const total = parseFloat(
      (watch("total") || "0").toString().replace(/\./g, "").replace(",", ".")
    );

    const juros = parseFloat((watch("jurosRecebido") || "0").replace(",", "."));
    const multa = parseFloat((watch("multaRecebida") || "0").replace(",", "."));
    const desconto = parseFloat(
      (watch("descontoConcedido") || "0").replace(",", ".")
    );

    const totalRecebido = total + (juros || 0) + (multa || 0) - (desconto || 0);

    setValue("totalRecebido", formatCurrency(totalRecebido));
  };

  const calculoData = () => {
    const dataVencimento = new Date(
      contasReceberForm.getValues("data_vencimento")
    );
    const dataRecebimento = new Date(
      contasReceberForm.getValues("data_recebimento")
    );

    const dias = differenceInDays(dataRecebimento, dataVencimento);

    const total = contasReceberForm.getValues("total")
      ? parseFloat(contasReceberForm.getValues("total").replace(",", "."))
      : 0;

    let pJuros = 0;
    let pMulta = 0;
    let pDesconto = 0;

    if (dias > 0) {
      pJuros =
        total * ((parseFloat(formatToDecimal(data.percentJuros)) / 100) * dias);
      pMulta = total * (data.percentMulta / 100);
    } else if (dias <= 0) {
      pDesconto = total * (data.percentDesconto / 100);
    }

    setValue("jurosRecebido", formatCurrency(pJuros));
    setValue("multaRecebida", formatCurrency(pMulta));
    setValue("descontoConcedido", formatCurrency(pDesconto));

    const recebido = total + (pJuros + pMulta - pDesconto);
    setValue("totalRecebido", formatCurrency(recebido));
  };

  const [preenchido, setPreenchido] = useState<boolean>(false);
  const handlePreenchidoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPreenchido(value.length > 0); // Define como true se houver texto, caso contrário, false
  };

  const onSubmit = async (pData: ContaReceber) => {
    let toastId = toast.loading("Processando...");

    try {
      if (action === "Receber") {
        const payload = transformarParaPutContaReceber(pData);
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
      } else if (action === "Reabrir") {
        const pId = pData.id;
        const response = await controller.reabrir(pId);
        toast.update(toastId, {
          render: response,
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

  const loadData = () => {
    if (String(data.cpf_cnpj).length > 11) {
      setPessoa("Jurídica");
    } else {
      setPessoa("Física");
    }
    reset({
      ...data,
      cpf_cnpj: formatCpfCnpj(data.cpf_cnpj),
      total: formatCurrency(data.total),
      percentJuros: formatCurrency(data.percentJuros),
      jurosRecebido: formatCurrency(data.jurosRecebido),
      percentMulta: formatCurrency(data.percentMulta),
      multaRecebida: formatCurrency(data.multaRecebida),
      percentDesconto: formatCurrency(data.percentDesconto),
      descontoConcedido: formatCurrency(data.descontoConcedido),
      totalRecebido: data.totalRecebido
        ? formatCurrency(data.totalRecebido)
        : action === "Visualizar"
        ? "0,00"
        : formatCurrency(data.total),
      data_recebimento: data.data_recebimento
        ? data.data_recebimento
        : action === "Visualizar"
        ? ""
        : formatISO(new Date()),
    });
  };

  useEffect(() => {
    if (isOpenModal && action) {
      loadData();
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
        <Dialog.Title>{action} Conta a Receber</Dialog.Title>
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
                  data.situacao === "Recebida"
                    ? "text-green-500"
                    : data.situacao === "Pendente"
                    ? "text-red-500"
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
                <Form.Label htmlFor="contrato_id">Código Contrato</Form.Label>
                <Form.Input
                  name="contrato_id"
                  placeholder="0"
                  max={5}
                  width={100}
                  defaultValue={data.contrato_id}
                  disabled={true}
                />
                <Form.ErrorMessage field="cliente_id" />
              </Form.Field>
            )}

            <Form.Field>
              <Form.Label htmlFor="cliente_id">Código Cliente</Form.Label>
              <Form.Input
                name="cliente_id"
                placeholder="0"
                max={5}
                width={100}
                defaultValue={data.cliente_id}
                disabled={action != "Cadastrar"}
              />
              <Form.ErrorMessage field="cliente_id" />
            </Form.Field>

            <Form.Field className="flex-1">
              <Form.Label htmlFor="cpf_cnpj">
                {pessoa === "Física" ? "CPF" : "CNPJ"}
              </Form.Label>
              <Form.Input
                name="cpf_cnpj"
                max={15}
                defaultValue={data.cpf_cnpj}
                disabled={true}
                maskType={pessoa === "Física" ? "cpf" : "cnpj"}
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
                width={100}
                value={`${data.numeroParcela}/${data.quantidadeParcelas}`}
                disabled={true}
              />
              <Form.ErrorMessage field="numeroParcela" />
              <Form.ErrorMessage field="quantidadeParcelas" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="formaPag_id">Código Forma Pag.</Form.Label>
              <Form.Input
                name="formaPag_id"
                placeholder="0"
                width={120}
                defaultValue={data.formaPag_id}
                disabled={true}
              />
              <Form.ErrorMessage field="formaPag_id" />
            </Form.Field>

            <Form.Field className="flex-1">
              <Form.Label htmlFor="formaPagamento">
                Forma de Pagamento
              </Form.Label>
              <Form.Input
                name="formaPagamento"
                placeholder="0"
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
              <Form.Label htmlFor="percentJuros">% Juros</Form.Label>
              <Form.Input
                name="percentJuros"
                width={100}
                defaultValue={data.percentJuros}
                disabled={true}
                maskType="percentage"
              />
              <Form.ErrorMessage field="percentJuros" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="percentMulta">% Multa</Form.Label>
              <Form.Input
                name="percentMulta"
                width={100}
                placeholder="0,00"
                defaultValue={data.percentMulta}
                disabled={true}
                maskType="percentage"
              />
              <Form.ErrorMessage field="percentMulta" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="percentDesconto">% Desconto</Form.Label>
              <Form.Input
                name="percentDesconto"
                width={100}
                placeholder="0,00"
                defaultValue={data.percentDesconto}
                disabled={true}
                maskType="percentage"
              />
              <Form.ErrorMessage field="percentDesconto" />
            </Form.Field>
          </div>

          <div className="flex gap-3 justify-between border-2 pl-10 pr-10 pt-4 pb-4 rounded-lg">
            <Form.Field>
              <Form.Label htmlFor={`data_recebimento`}>Recebimento</Form.Label>
              <Datepick
                name={`data_recebimento`}
                days={0}
                end={false}
                disabled={action != "Receber"}
                onBlur={calculoData}
              />
              <Form.ErrorMessage field={`data_recebimento`} />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor={`total`} className="flex flex-col">
                Total
              </Form.Label>
              <Form.Input
                name={`total`}
                width={100}
                maskType="money"
                disabled={true}
              />
              <Form.ErrorMessage field={`total`} />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor={"jurosRecebido"} className="flex flex-col">
                Juros
              </Form.Label>
              <Form.Input
                name={"jurosRecebido"}
                width={100}
                max={10}
                autoFocus={true}
                maskType="money"
                disabled={action != "Receber"}
                onChange={(e) => {
                  register("jurosRecebido").onChange(e);
                }}
                onBlur={() => handleValorChange()}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field={"jurosRecebido"} />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor={`multaRecebida`} className="flex flex-col">
                Multa
              </Form.Label>
              <Form.Input
                name={`multaRecebida`}
                width={100}
                max={10}
                maskType="money"
                disabled={action != "Receber"}
                onChange={(e) => {
                  register("multaRecebida").onChange(e);
                }}
                onBlur={() => handleValorChange()}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field={`multaRecebida`} />
            </Form.Field>

            <Form.Field>
              <Form.Label
                htmlFor={`descontoConcedido`}
                className="flex flex-col"
              >
                Desconto
              </Form.Label>
              <Form.Input
                name={`descontoConcedido`}
                width={100}
                max={10}
                maskType="money"
                disabled={action != "Receber"}
                onChange={(e) => {
                  register("descontoConcedido").onChange(e);
                }}
                onBlur={() => handleValorChange()}
                preenchidoChange={handlePreenchidoChange}
              />
              <Form.ErrorMessage field={`descontoConcedido`} />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor={`totalRecebido`} className="flex flex-col">
                Recebido
              </Form.Label>
              <Form.Input
                name={`totalRecebido`}
                width={100}
                maskType="money"
                disabled={true}
              />
              <Form.ErrorMessage field={`totalRecebido`} />
            </Form.Field>
          </div>

          <div className="flex w-full justify-end gap-3">
            {preenchido && action === "Receber" ? (
              <AlertCancel />
            ) : (
              <Dialog.Close>
                <Button variant="outline">Voltar</Button>
              </Dialog.Close>
            )}

            {action != "Visualizar" && (
              <AlertSubmit
                title={action as string}
                type="Conta a Receber"
                onSubmit={onSubmit}
                color={action === "Receber" ? "green" : "orange"}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </Dialog.Content>
  );
}

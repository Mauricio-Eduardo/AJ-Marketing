import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../../form";
import { formatISO } from "date-fns";
import { X } from "@phosphor-icons/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { DialogProps } from "../DialogProps";
import { Datepick } from "../../form/Datepicker";
import { formatCpfCnpj, formatCurrency } from "../../form/Formats";
import { ContratosSchema, createContratosSchema } from "./schema";
import { transformarParaPostContrato } from "../../../models/contrato/dto/createContrato.dto";
import { Contrato } from "../../../models/contrato/entity/Contrato";
import { CondicoesPagamentoController } from "../../../controllers/condicoesPagamento-controller";
import { CondicaoPagamento } from "../../../models/condicaoPagamento/entity/CondicaoPagamento";
import { CondicoesPagamentoSubView } from "../../../views/condicoesPagamento/subView";

interface ContratoDialogProps extends DialogProps {
  condicoesPagamentoController: CondicoesPagamentoController;
}

export function ContratoDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
  condicoesPagamentoController,
}: ContratoDialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const contratosForm = useForm<ContratosSchema>({
    resolver: zodResolver(createContratosSchema),
  });
  const { control, handleSubmit, reset, setValue } = contratosForm;

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
      } else if (action === "Cancelar") {
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
      cliente_id: 0,
      cpf_cnpj: "",
      nome_razaoSocial: "",
      proposta_id: 0,
      total: "0,00",
      condPag_id: 0,
      condicaoPagamento: "",
      data_contrato: formatISO(new Date()),
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
      }
    }
  }, [isOpenModal, action]);

  const onCondicaoPagamentoSubViewClose = (condicao?: CondicaoPagamento) => {
    if (condicao) {
      setCondicao(condicao);
    }
  };

  const getCondicao = async (pId: number) => {
    if (pId != 0) {
      if (condicoesPagamentoController) {
        try {
          const response = await condicoesPagamentoController.getOne(pId);
          if (response.ativo) {
            setCondicao(response);
          } else {
            setCondicaoNull();
          }
        } catch (error) {
          setCondicaoNull();
          console.log(error);
        }
      }
    }
  };

  const setCondicao = (pCondicao: CondicaoPagamento) => {
    setValue("condPag_id", pCondicao.id);
    setValue("condicaoPagamento", pCondicao.condicaoPagamento);
  };

  const setCondicaoNull = () => {
    setValue("condPag_id", 0);
    setValue("condicaoPagamento", "");
  };

  return (
    // <Dialog.Content
    //   maxWidth={"900px"}
    //   onInteractOutside={(e) => {
    //     e.preventDefault();
    //   }}
    //   onEscapeKeyDown={(e) => {
    //     e.preventDefault();
    //   }}
    // >
    /* <div className="flex justify-between">
        <Dialog.Title>{action} Proposta</Dialog.Title>

        <Dialog.Close>
          <X />
        </Dialog.Close>
      </div> */
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
            <Form.Label htmlFor="proposta_id">Cod. Proposta</Form.Label>
            <Form.Input
              name="proposta_id"
              placeholder="0"
              defaultValue={data.id}
              width={70}
              disabled={action != "Cadastar"}
            />
            <Form.ErrorMessage field="proposta_id" />
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
                  : undefined
              }
            />
            <Form.ErrorMessage field="situacao" />
          </Form.Field>
        </div>

        {/* Linha 2 */}
        <div className="flex gap-3">
          <Form.Field>
            <Form.Label htmlFor="cliente_id">Cod. Cliente</Form.Label>
            <Form.Input
              name="cliente_id"
              placeholder="0"
              defaultValue={data.id}
              width={100}
              disabled={action != "Cadastar"}
            />
            <Form.ErrorMessage field="cliente_id" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="cpf_cnpj">CPF/CNPJ</Form.Label>
            <Form.Input
              name="cpf_cnpj"
              width={170}
              max={15}
              defaultValue={data.cpf_cnpj}
              disabled={action != "Cadastrar"}
              // maskType={pessoa === "Física" ? "cpf" : "cnpj"}
            />
            <Form.ErrorMessage field="cpf_cnpj" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="nome_razaoSocial">
              Nome/Razão Social *
            </Form.Label>
            <Form.Input
              name="nome_razaoSocial"
              width={400}
              defaultValue={data.nome_razaoSocial}
              disabled={action != "Cadastrar"}
            />
            <Form.ErrorMessage field="nome_razaoSocial" />
          </Form.Field>
        </div>

        {/* Linha 3 */}
        <div className="flex gap-3">
          <Form.Field>
            <Form.Label htmlFor="data_proposta">Data do Contrato</Form.Label>
            <Datepick
              name="data_proposta"
              days={0}
              end={true}
              disabled={true}
            />
            <Form.ErrorMessage field="data_proposta" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="condPag_id">Cód. *</Form.Label>
            <Form.Input
              name="condPag_id"
              placeholder="0"
              max={5}
              width={70}
              defaultValue={data.condPag_id}
              onBlur={(e) => getCondicao(Number(e.target.value))}
              disabled={action === "Excluir"}
            />
            <Form.ErrorMessage field="condPag_id" />
          </Form.Field>

          <Form.Field>
            <br />
            <CondicoesPagamentoSubView
              onClose={onCondicaoPagamentoSubViewClose}
              controller={condicoesPagamentoController}
            />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="condicaoPagamento">Cond. Pag.</Form.Label>
            <Form.Input
              name="condicaoPagamento"
              placeholder="Selecione a Condição"
              max={56}
              width={250}
              value={data.condicaoPagamento}
              disabled={true}
            />
            <Form.ErrorMessage field="condicaoPagamento" />
          </Form.Field>
        </div>

        {/* SERVICOS */}
        <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
          <div className="flex flex-row gap-3 justify-between">
            <span className="text-sm font-medium">Serviços</span>
            <Form.Field>
              <Form.Label htmlFor="total">Total do Contrato</Form.Label>
              <Form.Input
                name="total"
                placeholder="0,00"
                width={100}
                defaultValue={data.total}
                disabled={true}
              ></Form.Input>
              <Form.ErrorMessage field="total" />
            </Form.Field>
          </div>
          {fields.map((field: any, index: any) => (
            <div
              key={field.id}
              className="flex gap-3 items-end border-2 border-gray-200 rounded p-2 justify-center"
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
          <Dialog.Close>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Dialog.Close>
          <Button
            type="submit"
            color={
              action === "Excluir" || action === "Recusar"
                ? "red"
                : action === "Aprovar"
                ? "green"
                : undefined
            }
          >
            {action}
          </Button>
        </div>
      </form>
    </FormProvider>

    // {/* </Dialog.Content> */}
  );
}

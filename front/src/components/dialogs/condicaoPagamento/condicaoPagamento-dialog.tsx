import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../../form";
import { format } from "date-fns";
import {
  CondicoesPagamentoSchema,
  createCondicoesPagamentoSchema,
} from "./schema";
import { Trash, X } from "@phosphor-icons/react";
import { FormaPagamento } from "../../../models/formaPagamento/entity/FormaPagamento";
import { CondicaoPagamento } from "../../../models/condicaoPagamento/entity/CondicaoPagamento";
import { transformarParaPostCondicaoPagamento } from "../../../models/condicaoPagamento/dto/createCondicaoPagamento.dto";
import { transformarParaPutCondicaoPagamento } from "../../../models/condicaoPagamento/dto/updateCondicaoPagamento.dto";
import { DialogProps } from "../DialogProps";
import { FormasPagamentoSubView } from "../../../views/formasPagamento/subView";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { formatCurrency } from "../../form/Formats";

export function CondicaoPagamentoDialog({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
  subController,
}: DialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const condicoesPagamentoForm = useForm<CondicoesPagamentoSchema>({
    resolver: zodResolver(createCondicoesPagamentoSchema),
  });
  const { control, handleSubmit, reset, setValue, watch } =
    condicoesPagamentoForm;

  // Aqui define que a variável 'parcelas' do zod vai ser usada pelo 'control'
  const { fields } = useFieldArray({
    control,
    name: "parcelas",
  });

  // Watching parcelas para calcular a porcentagem total conforme é preenchido
  const parcelas = watch("parcelas", []) || [];
  const [totalPorcentagem, setTotalPorcentagem] = useState<number>(100.0);

  // Atualiza o total de porcentagem toda vez que uma porcentagem é modificada
  const updateTotalPorcentagem = () => {
    if (parcelas && parcelas.length > 0) {
      const total = parcelas.reduce((acc: any, parcela: any) => {
        const porcentagem = parcela?.porcentagem
          ? String(parcela.porcentagem).replace(",", ".")
          : "0";
        return acc + (parseFloat(porcentagem) || 0);
      }, 0);

      setTotalPorcentagem(total);
    } else {
      setTotalPorcentagem(100);
    }
  };

  // Handler para o onChange dos campos de porcentagem das parcelas
  const handlePorcentagemChange = (index: number, value: string) => {
    const newParcelas = [...parcelas];
    newParcelas[index].porcentagem = value;

    setValue("parcelas", newParcelas);
    updateTotalPorcentagem();
  };

  const addNewParcela = () => {
    const qtd = condicoesPagamentoForm.getValues("quantidadeParcelas");

    if (qtd > 0) {
      const novasParcelas = [];

      for (let i = 1; i <= qtd; i++) {
        novasParcelas.push({
          numeroParcela: i,
          dias: 0,
          porcentagem: "0,00",
          formaPag_id: 0,
          formaPagamento: "",
        });
      }

      setValue("parcelas", novasParcelas);
    }
  };

  const removeParcela = (index: number) => {
    const updatedParcelas = parcelas.filter((_, i) => i !== index);

    // Reatribui os números das parcelas
    let qtdParcelas = 0;
    updatedParcelas.forEach((parcela, i) => {
      parcela.numeroParcela = i + 1;
      qtdParcelas++;
    });

    setValue("quantidadeParcelas", qtdParcelas);
    setValue("parcelas", updatedParcelas);
  };

  useEffect(() => {
    updateTotalPorcentagem();
    if (parcelas.length === 0) {
      setValue("quantidadeParcelas", 0);
    }
  }, [parcelas]);

  const onSubViewClose = (index: number, forma?: FormaPagamento) => {
    if (forma) {
      setFormaPagamento(index, forma);
    }
  };

  const onSubmit = async (pData: CondicaoPagamento) => {
    let toastId = toast.loading("Processando...");

    if ((totalPorcentagem as number) === 100.0) {
      try {
        if (action === "Cadastrar") {
          const payload = transformarParaPostCondicaoPagamento(pData);
          await controller.create(payload);
          toast.update(toastId, {
            render: "Condição de Pagamento cadastrada com sucesso!",
            type: "success",
            isLoading: false,
            draggable: true,
            draggableDirection: "x",
            autoClose: 3000,
          });
          onSuccess();
        } else if (action === "Editar") {
          const payload = transformarParaPutCondicaoPagamento(pData);
          await controller.update(payload);
          toast.update(toastId, {
            render: "Condição de Pagamento atualizada com sucesso!",
            type: "success",
            isLoading: false,
            draggable: true,
            draggableDirection: "x",
            autoClose: 3000,
          });
          onSuccess();
        } else if (action === "Excluir") {
          const id = pData.id;
          await controller.delete(id);
          toast.update(toastId, {
            render: "Condição de Pagamento excluída com sucesso!",
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
    } else {
      toast.update(toastId, {
        render: "A soma das porcentagens deve ser igual a 100%",
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
      condicaoPagamento: "",
      quantidadeParcelas: 0,
      juros: "0,00",
      multa: "0,00",
      desconto: "0,00",
      parcelas: [],
      ativo: true,
      data_cadastro: "",
      data_ult_alt: "",
    });
  };

  const loadData = () => {
    reset({
      ...data,
      juros: formatCurrency(data.juros),
      multa: formatCurrency(data.multa),
      desconto: formatCurrency(data.desconto),
      parcelas: data.parcelas
        ? data.parcelas.map((parcela: any) => ({
            ...parcela,
            porcentagem: formatCurrency(parcela.porcentagem),
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
    if (isOpenModal) {
      if (action !== "Cadastrar") {
        loadData();
      } else {
        cleanData();
      }
    }
  }, [isOpenModal, action]);

  const getFormaPagamento = async (index: number, pId: number) => {
    if (pId != 0) {
      if (subController) {
        try {
          const response = await subController.getOne(pId);
          if (response.ativo) {
            setFormaPagamento(index, response);
          } else {
            setFormaPagamentoNull(index);
          }
        } catch (error) {
          setFormaPagamentoNull(index);
          toast("Forma de Pagamento Inativa ou inexistente", {
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
    setValue(`parcelas.${index}.formaPag_id`, pFormaPagamento.id);
    setValue(
      `parcelas.${index}.formaPagamento`,
      pFormaPagamento.formaPagamento
    );
  };

  const setFormaPagamentoNull = (index: number) => {
    setValue(`parcelas.${index}.formaPag_id`, 0);
    setValue(`parcelas.${index}.formaPagamento`, "");
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
      className="absolute z-10"
    >
      <div className="flex justify-between">
        <Dialog.Title>{action} Condição de Pagamento</Dialog.Title>

        <Dialog.Close>
          <X />
        </Dialog.Close>
      </div>
      <FormProvider {...condicoesPagamentoForm}>
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
              <Form.Label htmlFor="condicaoPagamento">
                Condição de Pagamento *
              </Form.Label>
              <Form.Input
                type="text"
                name="condicaoPagamento"
                placeholder="Insira a Condição de Pagamento"
                max={50}
                width={250}
                defaultValue={data.condicaoPagamento}
                disabled={action === "Excluir"}
              />
              <Form.ErrorMessage field="condicaoPagamento" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="juros">% Juros</Form.Label>
              <Form.Input
                name="juros"
                width={100}
                placeholder="0,00"
                defaultValue={data.juros}
                disabled={action === "Excluir"}
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
                disabled={action === "Excluir"}
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
                disabled={action === "Excluir"}
                maskType="percentage"
              />
              <Form.ErrorMessage field="desconto" />
            </Form.Field>
          </div>

          {/* PARCELAS */}
          <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
            <div className="flex flex-row gap-3 justify-between">
              <span className="text-sm font-medium">Parcelas</span>
              <Form.Field>
                <span className="text-sm font-medium">
                  % Total:{" "}
                  {String(totalPorcentagem.toFixed(2).replace(".", ","))}
                </span>
                <Form.ErrorMessage field="totalPorcentagem" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="quantidadeParcelas">
                  Qtd. Parcelas
                </Form.Label>
                <Form.Input
                  name="quantidadeParcelas"
                  width={70}
                  max={2}
                  placeholder="0"
                  defaultValue={data.quantidadeParcelas}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="quantidadeParcelas" />
              </Form.Field>

              <Form.Field>
                <br />
                <Button
                  type="button"
                  onClick={() => {
                    addNewParcela();
                  }}
                  disabled={action === "Excluir"}
                >
                  Adicionar Parcelas
                </Button>
              </Form.Field>
            </div>
            {fields.map((field: any, index: any) => (
              <div
                key={field.id}
                className="flex gap-3 items-end border-2 border-gray-200 rounded p-2 justify-center"
              >
                <Form.Field>
                  <Form.Label
                    htmlFor={`parcelas.${index}.numeroParcela` as const}
                  >
                    N. Parcela
                  </Form.Label>
                  <Form.Input
                    type="number"
                    name={`parcelas.${index}.numeroParcela` as const}
                    width={70}
                    max={3}
                    disabled={true}
                  />
                  <Form.ErrorMessage
                    field={`parcelas.${index}.numeroParcela` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`parcelas.${index}.dias` as const}
                    className="flex flex-col"
                  >
                    Dias
                  </Form.Label>
                  <Form.Input
                    type="number"
                    name={`parcelas.${index}.dias` as const}
                    width={70}
                    max={3}
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage
                    field={`parcelas.${index}.dias` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`parcelas.${index}.porcentagem` as const}
                    className="flex flex-col"
                  >
                    %
                  </Form.Label>
                  <Form.Input
                    name={`parcelas.${index}.porcentagem` as const}
                    width={70}
                    maskType="percentage"
                    disabled={action === "Excluir"}
                    onBlur={(e) =>
                      handlePorcentagemChange(index, e.target.value)
                    }
                  />
                  <Form.ErrorMessage
                    field={`parcelas.${index}.porcentagem` as const}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label
                    htmlFor={`parcelas.${index}.formaPag_id` as const}
                    className="flex flex-col"
                  >
                    Cód.
                  </Form.Label>
                  <Form.Input
                    name={`parcelas.${index}.formaPag_id` as const}
                    width={70}
                    onBlur={(e) =>
                      getFormaPagamento(index, Number(e.target.value))
                    }
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage
                    field={`parcelas.${index}.formaPag_id` as const}
                  />
                </Form.Field>

                {subController && (
                  <Form.Field>
                    <br />
                    <FormasPagamentoSubView
                      index={index}
                      onClose={onSubViewClose}
                      controller={subController}
                    />
                  </Form.Field>
                )}

                <Form.Field>
                  <Form.Label
                    htmlFor={`parcelas.${index}.formaPagamento` as const}
                  >
                    Forma de Pagamento
                  </Form.Label>
                  <Form.Input
                    name={`parcelas.${index}.formaPagamento` as const}
                    placeholder="Selecione a Forma de Pagamento"
                    max={56}
                    width={250}
                    defaultValue={`data.parcelas.${index}.formaPagamento`}
                    disabled={true}
                  />
                  <Form.ErrorMessage
                    field={`parcelas.${index}.formaPagamento` as const}
                  />
                </Form.Field>
                <Button
                  type="button"
                  color="red"
                  onClick={() => removeParcela(index)}
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
            {action != "Excluir" && <Button type="submit">{action}</Button>}
          </div>
        </form>
      </FormProvider>
    </Dialog.Content>
  );
}

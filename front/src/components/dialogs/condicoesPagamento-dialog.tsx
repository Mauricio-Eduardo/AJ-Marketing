import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../form";
import { format } from "date-fns";
import {
  CondicoesPagamentoSchema,
  createCondicoesPagamentoSchema,
} from "../../screens/condicoesPagamento/schema";
import {
  ICondicoesPagamento,
  PostCondicoesPagamento,
  PutCondicoesPagamento,
  transformarParaPostCondicoesPagamento,
  transformarParaPutCondicoesPagamento,
} from "../../interfaces/ICondicoesPagamento";
import { FormasPagamentoScreen } from "../../screens/formasPagamento";
import { SearchButton } from "./search-dialog";
import { Trash } from "@phosphor-icons/react";

type ModalProps = {
  data: ICondicoesPagamento;
  action: string;
  onSuccess: () => void;
  onClose: () => void;
};

export function CondicoesPagamentoDialog({
  data,
  action,
  onSuccess,
  onClose,
}: ModalProps) {
  //
  // Configuração do Zod para validação dos formulários
  const condicoesPagamentoForm = useForm<CondicoesPagamentoSchema>({
    resolver: zodResolver(createCondicoesPagamentoSchema),
  });
  const { control, handleSubmit, reset, setValue, watch } =
    condicoesPagamentoForm;

  // Aqui define que a variável 'parcelas' do zod vai ser usada pelo 'control'
  const { fields, remove } = useFieldArray({
    control,
    name: "parcelas",
  });

  // Watching parcelas para calcular a porcentagem total conforme é preenchido
  const parcelas = watch("parcelas", []) || [];

  const [totalPorcentagem, setTotalPorcentagem] = useState<string>("100,00");

  // Atualiza o total de porcentagem toda vez que uma porcentagem é modificada
  const updateTotalPorcentagem = () => {
    if (parcelas && parcelas.length > 0) {
      const total = parcelas.reduce((acc: any, parcela: any) => {
        const porcentagem = parcela?.porcentagem
          ? String(parcela.porcentagem).replace(",", ".")
          : "0";
        return acc + (parseFloat(porcentagem) || 0);
      }, 0);

      setTotalPorcentagem(total.toFixed(2).replace(".", ","));
    } else {
      setTotalPorcentagem("100,00");
    }
  };

  // Handler para o onChange dos campos de porcentagem das parcelas
  const handlePorcentagemChange = (index: number, value: string) => {
    const newParcelas = [...parcelas];
    newParcelas[index].porcentagem = value;
    setValue("parcelas", newParcelas); // Atualiza o valor no formulário
    updateTotalPorcentagem(); // Atualiza o total de porcentagem
  };

  // Função para adicionar as parcelas
  const addNewParcela = () => {
    // Pega a quantidade de parcelas que está preenchida no formulário
    const quantidadeParcelasInput = document.querySelector<HTMLInputElement>(
      'input[name="quantidadeParcelas"]'
    );
    if (quantidadeParcelasInput) {
      const quantidadeParcelas = parseInt(quantidadeParcelasInput.value);

      const novasParcelas = [];

      for (let i = 1; i <= quantidadeParcelas; i++) {
        novasParcelas.push({
          numeroParcela: i,
          dias: 0, // Preencher dias com valor padrão
          porcentagem: "0,00", // Preencher porcentagem com valor padrão
          formaPag_ID: 0, // Preencher formaPag_ID com valor padrão
          formaPagamento: "", // Preencher formaPagamento com valor padrão
        });
      }

      // Atualizar o valor de 'parcelas' com as novas parcelas
      setValue("parcelas", novasParcelas);
      setTotalPorcentagem("0,00"); // Zera o total de porcentagem quando novas parcelas são adicionadas
    }
  };

  // Função para remover uma parcela
  const removeParcela = (index: number) => {
    remove(index); // Remove a parcela do form

    // Verifica se ainda existem parcelas após a remoção
    if (fields.length > 1) {
      updateTotalPorcentagem(); // Atualiza o total de porcentagem
    } else {
      setTotalPorcentagem("100,00"); // Volta o total de porcentagem para 100,00
    }
  };

  // Essas variáveis controlam o componente ToastMessage, que exibe as mensagens de sucesso ou erro que são definidas dentro do onSubmit
  // e chamada no final do Dialog.Content
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");

  // Faz a requisição Post/Put/Delete/ na API
  const onSubmit = async (pData: ICondicoesPagamento) => {
    if (totalPorcentagem !== "100,00") {
      setToastTitle("Erro");
      setToastMessage("A porcentagem total deve ser igual a 100%");
      setOpenToast(true);
      return;
    }

    let title = "";
    let message = "";

    try {
      if (action === "Cadastrar") {
        const payload: PostCondicoesPagamento =
          transformarParaPostCondicoesPagamento(pData);
        await api.post("PostCondicaoPagamento", JSON.stringify(payload));
        message = "Condição de Pagamento Inserida com Sucesso!";
      } else if (action === "Editar") {
        const payload: PutCondicoesPagamento =
          transformarParaPutCondicoesPagamento(pData);
        await api.put("PutCondicaoPagamento", JSON.stringify(payload));
        message = "Condição de Pagamento Alterada com Sucesso!";
      } else if (action === "Excluir") {
        const id = pData.condPag_ID;
        await api.delete("DeleteCondicaoPagamento", {
          params: { condPag_ID: id },
        });
        message = "Condição de Pagamento Deletada com Sucesso!";
      }

      title = "Sucesso!";

      if (action === "Cadastrar") {
        reset();
      }
    } catch (error) {
      title = "Não foi possível Excluir";
      message = "Inative o registro";
    } finally {
      setToastTitle(title);
      setToastMessage(message);
      setOpenToast(true);
      onSuccess();
    }
  };

  // Função para transformar número em string formatada
  const formatNumber = (value: any) => {
    return value !== undefined ? value.toFixed(2).replace(".", ",") : "";
  };

  // Toda vez que abrir a Modal vai executar esse código que carrega ou limpa o formulário
  useEffect(() => {
    if (action !== "Cadastrar") {
      reset({
        ...data,
        juros: formatNumber(data.juros),
        multa: formatNumber(data.multa),
        desconto: formatNumber(data.desconto),
        parcelas: data.parcelas
          ? data.parcelas.map((parcela) => ({
              ...parcela,
              porcentagem: formatNumber(parcela.porcentagem),
            }))
          : [],
        data_cadastro: data.data_cadastro
          ? format(new Date(data.data_cadastro), "dd/MM/yyyy HH:mm")
          : "",
        data_ult_alt: data.data_ult_alt
          ? format(new Date(data.data_ult_alt), "dd/MM/yyyy HH:mm")
          : "",
      });
    } else {
      reset({
        condPag_ID: 0,
        condicaoPagamento: "",
        juros: "0,00",
        multa: "0,00",
        desconto: "0,00",
        parcelas: [],
        ativo: true,
        data_cadastro: "",
        data_ult_alt: "",
      });
    }
  }, [action]);

  const getFormaPag = async (index: number, pId: number) => {
    if (pId != 0) {
      try {
        await api
          .get("GetFormaPagamento", { params: { formaPag_ID: pId } })
          .then((response) => {
            let { formaPagamento } = response.data;
            setValue(`parcelas.${index}.formaPag_ID`, pId);
            setValue(`parcelas.${index}.formaPagamento`, formaPagamento);
          })
          .catch(() => {
            setValue(`parcelas.${index}.formaPag_ID`, 0);
            setValue(`parcelas.${index}.formaPagamento`, "");
            setToastTitle("Ação inválida!");
            setToastMessage("Forma de Pagamento inativa ou inexistente!");
            setOpenToast(true);
          });
      } catch (error) {
        setToastTitle("Erro");
        setToastMessage(`Erro na requisição: ${String(error)}`);
        setOpenToast(true);
      }
    }
  };

  // Render
  return (
    <div>
      <Dialog.Content maxWidth={"800px"}>
        <Dialog.Title>{action} Condição de Pagamento</Dialog.Title>

        <FormProvider {...condicoesPagamentoForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Linha 1 */}
            <div className="flex justify-between">
              <Form.Field>
                <Form.Label htmlFor="condPag_ID">Código</Form.Label>
                <Form.Input
                  name="condPag_ID"
                  placeholder="0"
                  value={data.condPag_ID}
                  width={70}
                  disabled={true}
                />
                <Form.ErrorMessage field="condPag_ID" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="ativo">Ativo *</Form.Label>
                <Form.AtivoSelect
                  control={control}
                  name="ativo"
                  disabled={action === "Excluir"}
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
                    % Total: {totalPorcentagem}
                  </span>
                  <Form.ErrorMessage field="totalPorcentagem" />
                </Form.Field>

                <Form.Field>
                  <Form.Label className="text-sm font-medium">
                    Quantidade de Parcelas:
                  </Form.Label>
                  <Form.Input
                    type="number"
                    name="quantidadeParcelas"
                    max={2}
                    disabled={action === "Excluir"}
                  ></Form.Input>
                </Form.Field>
                {/* Botão para adicionar parcelas */}
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
                      disabled={action === "Excluir"}
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
                      htmlFor={`parcelas.${index}.formaPag_ID` as const}
                      className="flex flex-col"
                    >
                      Cód.
                    </Form.Label>
                    <Form.Input
                      name={`parcelas.${index}.formaPag_ID` as const}
                      width={70}
                      onBlur={(e) => getFormaPag(index, Number(e.target.value))}
                      disabled={action === "Excluir"}
                    />
                    <Form.ErrorMessage
                      field={`parcelas.${index}.formaPag_ID` as const}
                    />
                  </Form.Field>

                  <Form.Field>
                    <br />
                    <SearchButton ChildModal={FormasPagamentoScreen} />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label
                      htmlFor={`parcelas.${index}.formaPagamento` as const}
                    >
                      País
                    </Form.Label>
                    <Form.Input
                      type={`parcelas.${index}.formaPagamento` as const}
                      name={`parcelas.${index}.formaPagamento` as const}
                      placeholder="Selecione o País"
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
                  type="data_cadastro"
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
                  type="data_ult_alt"
                  name="data_ult_alt"
                  placeholder="00/00/0000 00:00"
                  width={150}
                  defaultValue={data.data_ult_alt}
                  disabled={true}
                />
                <Form.ErrorMessage field="data_ult_alt" />
              </Form.Field>
            </div>

            {/* Submit Buttons */}
            <div className="flex w-full justify-end gap-3">
              <Dialog.Close>
                <Button type="button" variant="outline" onClick={onClose}>
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

        <Form.ToastMessage
          title={toastTitle}
          description={toastMessage}
          open={openToast}
          onOpenChange={setOpenToast}
        />
      </Dialog.Content>
    </div>
  );
}

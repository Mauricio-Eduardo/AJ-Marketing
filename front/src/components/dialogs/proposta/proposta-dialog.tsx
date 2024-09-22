import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../../form";
import { addDays, format, formatISO } from "date-fns";
import { createPropostasSchema, PropostasSchema } from "./schema";
import { Trash } from "@phosphor-icons/react";
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
import { Peridiocidade } from "../../../models/peridiocidade/entity/Peridiocidade";
import { ServicosController } from "../../../controllers/servicos-controller";
import { PeridiocidadesController } from "../../../controllers/peridiocidades-controller";
import { PeridiocidadesSubView } from "../../../views/peridiocidades/subView";
import { ClientesSubView } from "../../../views/clientes/subView";
import { ClientesController } from "../../../controllers/clientes-controller";
import { Cliente } from "../../../models/cliente/entity/Cliente";
import { PropostasController } from "../../../controllers/propostas-controller";

interface PropostaDialogProps extends DialogProps {
  controller: PropostasController;
  clientesController: ClientesController;
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
  peridiocidadesController,
  servicosController,
  stepper,
}: PropostaDialogProps) {
  //
  // Configuração do Zod para validação dos formulários
  const propostasForm = useForm<PropostasSchema>({
    resolver: zodResolver(createPropostasSchema),
  });
  const { register, control, handleSubmit, reset, setValue, watch } =
    propostasForm;

  // Aqui define que a variável 'servicos' do zod vai ser usada pelo 'control'
  const { fields, append, remove } = useFieldArray({
    control,
    name: "servicos",
  });

  const [pessoa, setPessoa] = useState<string>("Física" || "Jurídica");

  const addNewServico = () => {
    if (fields.length < 8) {
      append({
        servico_id: 0,
        servico: "",
        quantidade: 0,
        valor_unitario: "0,00",
        desconto: "0,00",
        valor_total: "0,00",
      });
    }
  };

  useEffect(() => {
    console.log(pessoa);
  }, [pessoa]);

  const onClienteSubViewClose = (cliente?: Cliente) => {
    if (cliente) {
      setCliente(cliente);
    }
  };

  const onPeridiocidadeSubViewClose = (peridiocidade?: Peridiocidade) => {
    if (peridiocidade) {
      setPeridiocidade(peridiocidade);
    }
  };

  const onServicoSubViewClose = (index: number, servico?: Servico) => {
    if (servico) {
      setServico(index, servico);
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
      } else if (action === "Recusar" || action === "Aprovar") {
        const payload = transformarParaPutProposta(pData);
        payload.situacao = action === "Recusar" ? "Recusada" : "Aprovada";
        await controller.update(payload);
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
      peridiocidade_id: 0,
      descricao: "",
      dias: 0,
      cliente_id: 0,
      tipo_pessoa: "",
      cpf_cnpj: "",
      nome_razaoSocial: "",
      data_proposta: formatISO(new Date()),
      prazo_final: formatISO(addDays(new Date(), 30)),
      data_inicio: formatISO(addDays(new Date(), 30)),
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
    if (isOpenModal) {
      if (action !== "Cadastrar") {
        loadData();
      } else {
        cleanData();
      }
    }
  }, [isOpenModal, action]);

  useEffect(() => {
    if (propostasForm.getValues("tipo_pessoa")) {
      setPessoa(propostasForm.getValues("tipo_pessoa"));
    }
  }, [propostasForm.getValues("tipo_pessoa")]);

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
  };

  const setServicoNull = (index: number) => {
    setValue(`servicos.${index}.servico_id`, 0);
    setValue(`servicos.${index}.servico`, "");
  };

  const getPeridiocidade = async (pId: number) => {
    if (pId != 0) {
      if (peridiocidadesController) {
        try {
          const response = await peridiocidadesController.getOne(pId);
          if (response.ativo) {
            setPeridiocidade(response);
          } else {
            setPeridiocidadeNull();
          }
        } catch (error) {
          setPeridiocidadeNull();
          toast("Peridiocidade Inativa ou inexistente", {
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          console.log(error);
        }
      }
    }
  };

  const setPeridiocidade = (pPeridiocidade: Peridiocidade) => {
    setValue(`peridiocidade_id`, pPeridiocidade.id);
    setValue(`descricao`, pPeridiocidade.descricao);
    setValue(`dias`, pPeridiocidade.dias);
  };

  const setPeridiocidadeNull = () => {
    setValue(`peridiocidade_id`, 0);
    setValue(`descricao`, "");
    setValue(`dias`, 0);
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
    }
  };

  const setCliente = (pCliente: Cliente) => {
    setValue(`cliente_id`, pCliente.id);
    setValue(`tipo_pessoa`, pCliente.tipo_pessoa);
    setValue(`cpf_cnpj`, formatCpfCnpj(pCliente.cpf_cnpj));
    setValue(`nome_razaoSocial`, pCliente.nome_razaoSocial);
  };

  const setClienteNull = () => {
    setValue(`cliente_id`, 0);
    setValue(`tipo_pessoa`, "");
    setValue(`cpf_cnpj`, "");
    setValue(`nome_razaoSocial`, "");
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
    //   <div className="flex justify-between">
    //     <Dialog.Title>{action} Proposta</Dialog.Title>

    //     <Dialog.Close>
    //       <X />
    //     </Dialog.Close>
    //   </div>
    <FormProvider {...propostasForm}>
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
            <Form.Label htmlFor="cliente_id">Cód. *</Form.Label>
            <Form.Input
              name="cliente_id"
              placeholder="0"
              max={5}
              width={70}
              defaultValue={data.cliente_id}
              onBlur={(e) => getCliente(Number(e.target.value))}
              disabled={action === "Excluir"}
            />
            <Form.ErrorMessage field="cliente_id" />
          </Form.Field>

          <Form.Field>
            <br />
            <ClientesSubView
              onClose={onClienteSubViewClose}
              controller={clientesController}
            />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="tipo_pessoa">Tipo Pessoa *</Form.Label>
            <Form.TipoPessoaSelect
              control={control}
              name="tipo_pessoa"
              disabled={true}
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
              disabled={true}
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
              width={pessoa === "Física" ? 580 : 540}
              defaultValue={data.nome_razaoSocial}
              disabled={true}
            />
            <Form.ErrorMessage field="nome_razaoSocial" />
          </Form.Field>
        </div>

        <div className="flex gap-3">
          <Form.Field>
            <Form.Label htmlFor="peridiocidade_id">Cód. *</Form.Label>
            <Form.Input
              name="peridiocidade_id"
              placeholder="0"
              max={5}
              width={70}
              defaultValue={data.peridiocidade_id}
              onBlur={(e) => getPeridiocidade(Number(e.target.value))}
              disabled={action === "Excluir"}
            />
            <Form.ErrorMessage field="peridiocidade_id" />
          </Form.Field>

          <Form.Field>
            <br />
            <PeridiocidadesSubView
              onClose={onPeridiocidadeSubViewClose}
              controller={peridiocidadesController}
            />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="descricao">Descrição</Form.Label>
            <Form.Input
              name="descricao"
              placeholder="Selecione a Peridiocidade"
              max={56}
              width={250}
              value={data.descricao}
              disabled={true}
            />
            <Form.ErrorMessage field="descricao" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="dias">Dias</Form.Label>
            <Form.Input
              name="dias"
              placeholder="0"
              width={100}
              value={data.dias}
              disabled={true}
            />
            <Form.ErrorMessage field="dias" />
          </Form.Field>
        </div>

        {/* Linha 4 */}
        <div className="flex justify-between m-10">
          <Form.Field>
            <Form.Label htmlFor="data_proposta">Data da Proposta</Form.Label>
            <Datepick
              name="data_proposta"
              days={0}
              end={true}
              disabled={action != "Cadastrar" && action != "Editar"}
            />
            <Form.ErrorMessage field="data_proposta" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="prazo_final">Prazo Final</Form.Label>
            <Datepick
              name="prazo_final"
              days={30}
              disabled={action != "Cadastrar" && action != "Editar"}
            />
            <Form.ErrorMessage field="prazo_final" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="data_inicio">Data de Início</Form.Label>
            <Datepick
              name="data_inicio"
              days={30}
              disabled={action != "Cadastrar" && action != "Editar"}
            />
            <Form.ErrorMessage field="data_inicio" />
          </Form.Field>
        </div>

        {/* SERVICOS */}
        <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
          <div className="flex flex-row gap-3 justify-between">
            <span className="text-sm font-medium">Serviços</span>
            <Form.Field>
              <Form.Label htmlFor="total">Total da Proposta</Form.Label>
              <Form.Input
                name="total"
                placeholder="0,00"
                width={100}
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
                  (action != "Cadastrar" && action != "Editar") ||
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
                  onBlur={(e) => getServico(index, Number(e.target.value))}
                  disabled={action != "Cadastrar" && action != "Editar"}
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
                  disabled={action != "Cadastrar" && action != "Editar"}
                  onChange={(e) => {
                    register(`servicos.${index}.quantidade` as const).onChange(
                      e
                    );
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
                  disabled={action != "Cadastrar" && action != "Editar"}
                  onChange={(e) => {
                    register(`servicos.${index}.quantidade` as const).onChange(
                      e
                    );
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
                  disabled={action != "Cadastrar" && action != "Editar"}
                  onChange={(e) => {
                    register(`servicos.${index}.quantidade` as const).onChange(
                      e
                    );
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

        {!stepper && (
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
        )}
      </form>
    </FormProvider>
    // </Dialog.Content>
  );
}

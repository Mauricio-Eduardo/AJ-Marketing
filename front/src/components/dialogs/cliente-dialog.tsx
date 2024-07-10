import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, TextArea } from "@radix-ui/themes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../form";
import { format } from "date-fns";
import {
  IClientes,
  PostClientes,
  PutClientes,
  transformarParaPostClientes,
  transformarParaPutClientes,
} from "../../interfaces/IClientes";
import {
  ClienteSchema,
  createClienteSchema,
} from "../../screens/clientes/schema";
import { SearchButton } from "./search-dialog";
import { OrigensScreen } from "../../screens/origens";
import { CidadesScreen } from "../../screens/cidades";
import { UsuariosScreen } from "../../screens/usuarios";
import { Trash } from "@phosphor-icons/react";

type ModalProps = {
  data: IClientes;
  action: string;
  onSuccess: () => void;
};

export function ClienteDialog({ data, action, onSuccess }: ModalProps) {
  //
  // Configuração do Zod para validação dos formulários
  const clienteForm = useForm<ClienteSchema>({
    resolver: zodResolver(createClienteSchema),
  });
  const { register, control, handleSubmit, reset, setValue } = clienteForm;

  // Aqui define que a variável 'usuarios' do zod vai ser usada pelo 'control'
  const { fields, append, remove } = useFieldArray({
    control,
    name: "usuarios",
  });

  function addUsuario() {
    append({ usuario_ID: 0, nome: "", cpf: "" });
  }

  const [pessoa, setPessoa] = useState<string>();

  // UseEffect para atualizar 'pessoa' quando o 'clienteForm' estiver pronto
  // useEffect(() => {
  //   const tipoPessoa = clienteForm.getValues("tipo_pessoa");
  //   setPessoa(tipoPessoa);
  // }, [clienteForm.getValues("tipo_pessoa")]);

  // Essas variáveis controlam o componente ToastMessage, que exibe as mensagens de sucesso ou erro que são definidas dentro do onSubmit
  // E chamada no final do Dialog.Content
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");

  // Faz a requisição Post/Put/Delete/ na API
  const onSubmit = async (pData: IClientes) => {
    let message = "";

    try {
      if (action === "Cadastrar") {
        const payload: PostClientes = transformarParaPostClientes(pData);
        await api.post("PostCliente", JSON.stringify(payload));
        message = "Cliente Inserido com Sucesso!";
      } else if (action === "Editar") {
        const payload: PutClientes = transformarParaPutClientes(pData);
        await api.put("PutCliente", JSON.stringify(payload));
        message = "Cliente Alterado com Sucesso!";
      } else if (action === "Excluir") {
        const id = pData.cliente_ID;
        await api.delete("DeleteCliente", { params: { cliente_ID: id } });
        message = "Cliente Deletado com Sucesso!";
      }

      setToastTitle("Sucesso!");
      setToastMessage(message);
      setOpenToast(true);
      onSuccess();

      if (action === "Cadastrar") {
        reset({});
      }
    } catch (error) {
      setToastTitle("Erro");
      setToastMessage(`Erro na requisição: ${String(error)}`);
      setOpenToast(true);
    }
  };

  // Função para buscar os usuarios da API
  const GetUsuario = async (index: number, pId: number) => {
    if (pId != 0) {
      try {
        await api
          .get("GetUsuario", { params: { usuario_ID: pId } })
          .then((response) => {
            let { nome, cpf } = response.data;
            setValue(`usuarios.${index}.usuario_ID`, pId);
            setValue(`usuarios.${index}.nome`, nome);
            setValue(`usuarios.${index}.cpf`, cpf);
          })
          .catch(() => {
            setValue(`usuarios.${index}.usuario_ID`, 0);
            setValue(`usuarios.${index}.nome`, "");
            setValue(`usuarios.${index}.cpf`, "");
            setToastTitle("Ação inválida!");
            setToastMessage("Usuário inativo ou inexistente!");
            setOpenToast(true);
          });
      } catch (error) {
        setToastTitle("Erro");
        setToastMessage(`Erro na requisição: ${String(error)}`);
        setOpenToast(true);
      }
    }
  };

  // Função para buscar as cidades da API
  const GetCidade = async (pId: number) => {
    if (pId != 0) {
      try {
        await api
          .get("GetCidade", { params: { cidade_ID: pId } })
          .then((response) => {
            let { cidade, estado, pais } = response.data;
            setValue("cidade_ID", pId);
            setValue("cidade", cidade);
            setValue("estado", estado);
            setValue("pais", pais);
          })
          .catch(() => {
            setValue("cidade_ID", 0);
            setToastTitle("Ação inválida!");
            setToastMessage("Cidade inativa ou inexistente!");
            setOpenToast(true);
          });
      } catch (error) {
        setToastTitle("Sucesso");
        setToastMessage(`Erro na requisição: ${String(error)}`);
        setOpenToast(true);
      }
    }
  };

  // Toda vez que abrir a Modal vai executar esse código que carrega ou limpa o formulário
  useEffect(() => {
    if (action !== "Cadastrar") {
      reset({
        ...data,
        usuarios: data.usuarios
          ? data.usuarios.map((usuario) => ({
              ...usuario,
            }))
          : [],
        tipo_pessoa: "fisica",
        data_cadastro: data.data_cadastro
          ? format(new Date(data.data_cadastro), "dd/MM/yyyy HH:mm")
          : "",
        data_ult_alt: data.data_ult_alt
          ? format(new Date(data.data_ult_alt), "dd/MM/yyyy HH:mm")
          : "",
      });
    } else {
      reset({
        cliente_ID: 0,
        tipo_pessoa: "física",
        cpf_cnpj: "",
        nome_razaoSocial: "",
        apelido_nomeFantasia: "",
        rg_inscricaoEstadual: "",
        dataNascimento_dataAbertura: "",
        genero: "",
        email: "",
        celular: "",
        ramo_atividade: "",
        cidade_ID: 0,
        cidade: "",
        estado: "",
        pais: "",
        logradouro: "",
        numero: "",
        bairro: "",
        complemento: "",
        cep: "",
        origem_ID: 0,
        origem: "",
        interesses: "",
        usuarios: [],
        ativo: true,
        data_cadastro: "",
        data_ult_alt: "",
      });
    }
  }, [action]);

  const getOrigem = async (pId: number) => {
    if (pId != 0) {
      try {
        await api
          .get("GetOrigem", { params: { origem_ID: pId } })
          .then((response) => {
            let { origem } = response.data;
            setValue("origem", origem);
          })
          .catch(() => {
            setValue("origem_ID", 0);
            setToastTitle("Ação inválida!");
            setToastMessage("Origem inativa ou inexistente!");
            setOpenToast(true);
          });
      } catch (error) {
        setToastTitle("Sucesso");
        setToastMessage(`Erro na requisição: ${String(error)}`);
        setOpenToast(true);
      }
    }
  };

  // Render
  return (
    <div>
      <Dialog.Content maxWidth={"1000px"}>
        <Dialog.Title>{action} Cliente</Dialog.Title>
        <span>{clienteForm.getValues("tipo_pessoa")}</span>
        {/* <span>{clienteForm.getValues("genero")}</span> */}

        <FormProvider {...clienteForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Linha 1 */}
            <div className="flex justify-between">
              <div className="flex gap-6">
                <Form.Field>
                  <Form.Label htmlFor="cliente_ID">Código</Form.Label>
                  <Form.Input
                    name="cliente_ID"
                    placeholder="0"
                    value={data.cliente_ID}
                    width={70}
                    disabled={true}
                  />
                  <Form.ErrorMessage field="cliente_ID" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="tipo_pessoa">Tipo Pessoa *</Form.Label>
                  <Form.TipoPessoaSelect
                    control={control}
                    name="tipo_pessoa"
                    disabled={action === "Excluir"}
                  />
                  <Form.ErrorMessage field="tipo_pessoa" />
                </Form.Field>
              </div>

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
                <Form.Label htmlFor="nome_razaoSocial">
                  {clienteForm.getValues("tipo_pessoa") === "fisica"
                    ? "Nome *"
                    : "Razão Social *"}
                </Form.Label>
                <Form.Input
                  type="nome_razaoSocial"
                  name="nome_razaoSocial"
                  placeholder={
                    clienteForm.getValues("tipo_pessoa") === "fisica"
                      ? "Nome"
                      : "Razão Social"
                  }
                  max={50}
                  width={370}
                  defaultValue={data.nome_razaoSocial}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="nome_razaoSocial" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="apelido_nomeFantasia">
                  {clienteForm.getValues("tipo_pessoa") === "fisica"
                    ? "Apelido"
                    : "Nome Fantasia"}
                </Form.Label>
                <Form.Input
                  type="apelido_nomeFantasia"
                  name="apelido_nomeFantasia"
                  placeholder={
                    clienteForm.getValues("tipo_pessoa") === "fisica"
                      ? "Apelido"
                      : "Nome Fantasia"
                  }
                  max={50}
                  width={370}
                  defaultValue={data.apelido_nomeFantasia}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="apelido_nomeFantasia" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="genero">Gênero *</Form.Label>
                <Form.GeneroSelect
                  control={control}
                  name="genero"
                  disabled={
                    action === "Excluir" ||
                    clienteForm.getValues("tipo_pessoa") === "juridica"
                  }
                />
                <Form.ErrorMessage field="genero" />
              </Form.Field>
            </div>

            {/* Linha 3 */}
            <div className="flex gap-3 items-center">
              <Form.Field>
                <Form.Label htmlFor="email">Email *</Form.Label>
                <Form.Input
                  type="email"
                  name="email"
                  placeholder="exemplo@hotmail.com"
                  max={50}
                  width={300}
                  defaultValue={data.email}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="email" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="celular">Celular *</Form.Label>
                <Form.Input
                  type="celular"
                  name="celular"
                  placeholder="(00) 00000-0000"
                  max={11}
                  width={130}
                  defaultValue={data.celular}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="celular" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="rg_inscricaoEstadual">
                  {pessoa === "fisica" ? "RG" : "IE"}
                </Form.Label>
                <Form.Input
                  type="rg_inscricaoEstadual"
                  name="rg_inscricaoEstadual"
                  placeholder=""
                  max={14}
                  width={150}
                  defaultValue={data.rg_inscricaoEstadual}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="rg_inscricaoEstadual" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="dataNascimento_dataAbertura">
                  {pessoa === "fisica" ? "Data Nascimento" : "Data Abertura"}
                </Form.Label>
                <Form.Input
                  type="dataNascimento_dataAbertura"
                  name="dataNascimento_dataAbertura"
                  placeholder="00/00/0000"
                  max={50}
                  width={120}
                  defaultValue={data.dataNascimento_dataAbertura}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="dataNascimento_dataAbertura" />
              </Form.Field>
            </div>

            {/* Linha 4 */}
            <div className="flex gap-3">
              <Form.Field>
                <Form.Label htmlFor="origem_ID">Cód. *</Form.Label>
                <Form.Input
                  type="origem_ID"
                  name="origem_ID"
                  placeholder="0"
                  max={5}
                  width={70}
                  defaultValue={data.origem_ID}
                  onBlur={(e) => getOrigem(Number(e.target.value))}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="origem_ID" />
              </Form.Field>

              <Form.Field>
                <br />
                <SearchButton ChildModal={OrigensScreen} />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="origem">Origem</Form.Label>
                <Form.Input
                  type="origem"
                  name="origem"
                  placeholder="Selecione a Origem"
                  max={56}
                  width={200}
                  defaultValue={data.origem}
                  disabled={true}
                />
                <Form.ErrorMessage field="origem" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="ramo_atividade">
                  Ramo de Atividade
                </Form.Label>
                <Form.Input
                  type="ramo_atividade"
                  name="ramo_atividade"
                  placeholder=""
                  max={30}
                  width={250}
                  defaultValue={data.ramo_atividade}
                  disabled={action === "Excluir"}
                />
                <Form.ErrorMessage field="ramo_atividade" />
              </Form.Field>
            </div>

            {/* Endereço */}
            <div className="flex-col space-y-1">
              <Form.Label htmlFor="responsaveis">Endereço</Form.Label>
              <div className="flex-col space-y-3 border-2 p-4 rounded-lg">
                <div className="flex gap-3">
                  <Form.Field>
                    <Form.Label htmlFor="cidade_ID">Cód. *</Form.Label>
                    <Form.Input
                      type="cidade_ID"
                      name="cidade_ID"
                      placeholder="0"
                      max={5}
                      width={70}
                      defaultValue={data.cidade_ID}
                      onBlur={(e) => GetCidade(Number(e.target.value))}
                      disabled={action === "Excluir"}
                    />
                    <Form.ErrorMessage field="cidade_ID" />
                  </Form.Field>

                  <Form.Field>
                    <br />
                    <SearchButton ChildModal={CidadesScreen} />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label htmlFor="cidade">Cidade</Form.Label>
                    <Form.Input
                      type="cidade"
                      name="cidade"
                      placeholder="Selecione a Cidade"
                      width={200}
                      defaultValue={data.cidade}
                      disabled={true}
                    />
                    <Form.ErrorMessage field="cidade" />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label htmlFor="estado">Estado</Form.Label>
                    <Form.Input
                      type="estado"
                      name="estado"
                      placeholder=""
                      width={200}
                      defaultValue={data.estado}
                      disabled={true}
                    />
                    <Form.ErrorMessage field="estado" />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label htmlFor="pais">País</Form.Label>
                    <Form.Input
                      type="pais"
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
                      type="cep"
                      name="cep"
                      placeholder="0000-000"
                      max={8}
                      width={100}
                      defaultValue={data.cep}
                      disabled={action === "Excluir"}
                    />
                    <Form.ErrorMessage field="cep" />
                  </Form.Field>
                </div>

                <div className="flex gap-3">
                  <Form.Field>
                    <Form.Label htmlFor="logradouro">Logradouro *</Form.Label>
                    <Form.Input
                      type="logradouro"
                      name="logradouro"
                      max={80}
                      width={300}
                      defaultValue={data.logradouro}
                      disabled={action === "Excluir"}
                    />
                    <Form.ErrorMessage field="logradouro" />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label htmlFor="numero">Número *</Form.Label>
                    <Form.Input
                      type="numero"
                      name="numero"
                      placeholder=""
                      max={6}
                      width={70}
                      defaultValue={data.numero}
                      disabled={action === "Excluir"}
                    />
                    <Form.ErrorMessage field="numero" />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label htmlFor="bairro">Bairro *</Form.Label>
                    <Form.Input
                      type="bairro"
                      name="bairro"
                      placeholder=""
                      max={30}
                      width={200}
                      defaultValue={data.bairro}
                      disabled={action === "Excluir"}
                    />
                    <Form.ErrorMessage field="bairro" />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label htmlFor="complemento">Complemento</Form.Label>
                    <Form.Input
                      type="complemento"
                      name="complemento"
                      placeholder=""
                      max={80}
                      width={300}
                      defaultValue={data.complemento}
                      disabled={action === "Excluir"}
                    />
                    <Form.ErrorMessage field="complemento" />
                  </Form.Field>
                </div>
              </div>
            </div>

            {/* Interesses */}
            <div className="flex-col space-y-1">
              <Form.Label htmlFor="interesses">Interesses</Form.Label>
              <TextArea
                className="flex-1"
                maxLength={255}
                placeholder="Insira os interesses do cliente..."
                {...register("interesses")}
              />
              <Form.ErrorMessage field="interesses" />
            </div>

            {/* USUARIOS */}
            <div className="flex flex-col gap-1 border-t-2 pt-4 border-gray-200">
              <div className="flex flex-row gap-3 justify-between">
                <span className="text-sm font-medium">
                  Usuários Responsáveis
                </span>

                {/* Botão para adicionar usuarios */}
                <Form.Field>
                  <br />
                  <Button
                    type="button"
                    onClick={() => {
                      addUsuario();
                    }}
                    disabled={action === "Excluir"}
                  >
                    Adicionar Usuário
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
                      htmlFor={`usuarios.${index}.usuario_ID` as const}
                      className="flex flex-col"
                    >
                      Cód.
                    </Form.Label>
                    <Form.Input
                      name={`usuarios.${index}.usuario_ID` as const}
                      width={70}
                      onBlur={(e) => GetUsuario(index, Number(e.target.value))}
                      disabled={action === "Excluir"}
                    />
                    <Form.ErrorMessage
                      field={`usuarios.${index}.usuario_ID` as const}
                    />
                  </Form.Field>

                  <Form.Field>
                    <br />
                    <SearchButton ChildModal={UsuariosScreen} />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label htmlFor={`usuarios.${index}.nome` as const}>
                      Nome
                    </Form.Label>
                    <Form.Input
                      type={`usuarios.${index}.nome` as const}
                      name={`usuarios.${index}.nome` as const}
                      placeholder="Selecione o Usuário"
                      width={250}
                      defaultValue={`data.usuarios.${index}.nome`}
                      disabled={true}
                    />
                    <Form.ErrorMessage
                      field={`usuarios.${index}.nome` as const}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label htmlFor={`usuarios.${index}.nome` as const}>
                      CPF
                    </Form.Label>
                    <Form.Input
                      type={`usuarios.${index}.cpf` as const}
                      name={`usuarios.${index}.cpf` as const}
                      placeholder=""
                      width={150}
                      defaultValue={`data.usuarios.${index}.cpf`}
                      disabled={true}
                    />
                    <Form.ErrorMessage
                      field={`usuarios.${index}.cpf` as const}
                    />
                  </Form.Field>
                  <Button
                    type="button"
                    color="red"
                    onClick={() => remove(index)}
                  >
                    <Trash weight="bold" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Linha 7 */}
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
                <Button variant="outline">Cancelar</Button>
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

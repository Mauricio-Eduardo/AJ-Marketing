import { Button, Dialog, Flex } from "@radix-ui/themes";
import {
  Eye,
  Pencil,
  Plus,
  ThumbsDown,
  ThumbsUp,
  X,
} from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { PropostasController } from "../../controllers/propostas-controller";
import { Proposta } from "../../models/proposta/entity/Proposta";
import { ServicosController } from "../../controllers/servicos-controller";
import { PropostaDialog } from "../../components/dialogs/proposta/proposta-dialog";
import { PropostasColumns } from "../../components/datatable/columns/propostas-columns";
import { PeridiocidadesController } from "../../controllers/peridiocidades-controller";
import { ClientesController } from "../../controllers/clientes-controller";
import { ClienteDialog } from "../../components/dialogs/cliente/cliente-dialog";
import { RamosAtividadeController } from "../../controllers/ramosAtividade-controller";
import { InteressesController } from "../../controllers/interesses-controller";
import { UsuariosController } from "../../controllers/usuarios-controller";
import { CidadesController } from "../../controllers/cidades-controller";
import { OrigensController } from "../../controllers/origens-controller";
import { formatCpfCnpj } from "../../components/form/Formats";
import { Cliente } from "../../models/cliente/entity/Cliente";
import { AlertConfirm } from "../../components/form/Alerts";

export const PropostasView = () => {
  const propostasController = new PropostasController();
  const clientesController = new ClientesController();
  const peridiocidadesController = new PeridiocidadesController();
  const servicosController = new ServicosController();

  // Controllers para chamar caso precise cadastrar o cliente antes de aprovar a proposta
  const origensController = new OrigensController();
  const cidadesController = new CidadesController();
  const usuariosController = new UsuariosController();
  const interessesController = new InteressesController();
  const ramosAtividadeController = new RamosAtividadeController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    | "Cadastrar"
    | "Editar"
    | "Aprovar"
    | "Recusar"
    | "Cancelar"
    | "Visualizar"
    | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<
    Proposta | undefined
  >();
  const handleRowSelectionChange = (selectedRow: Proposta) => {
    setSelectedRowData(selectedRow);
  };

  const handleSuccess = () => {
    // Incrementa o refreshKey para forçar o refresh da DataTable
    setRefreshKey((prevKey) => prevKey + 1);
    handleOpenDialog();
  };

  const handleActionChange = (
    action:
      | "Cadastrar"
      | "Editar"
      | "Aprovar"
      | "Recusar"
      | "Cancelar"
      | "Visualizar"
  ) => {
    setDialogAction(action);
    if (action === "Aprovar" && !selectedRowData?.cliente_id) {
      setDialogOpen(true);
      return;
    }
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  return (
    <div className="flex flex-col">
      <Dialog.Root open={isDialogOpen} onOpenChange={handleOpenDialog}>
        <Flex
          justify={"between"}
          direction={"row"}
          className="pb-2 border-b-2 border-b-gray-200"
        >
          <div className="space-x-3">
            <Dialog.Trigger>
              <Button
                onClick={() => {
                  handleActionChange("Cadastrar");
                }}
              >
                <Plus />
                Cadastrar
              </Button>
            </Dialog.Trigger>

            <Dialog.Trigger>
              <Button
                onClick={() => {
                  handleActionChange("Editar");
                }}
                disabled={selectedRowData?.situacao != "Pendente"}
              >
                <Pencil />
                Editar
              </Button>
            </Dialog.Trigger>

            <Dialog.Trigger>
              <Button
                onClick={() => {
                  handleActionChange("Visualizar");
                }}
                disabled={!selectedRowData?.id}
                variant="outline"
              >
                <Eye />
                Visualizar
              </Button>
            </Dialog.Trigger>
          </div>
          <div className="flex gap-3">
            {!selectedRowData?.cliente_id ? (
              <AlertConfirm
                title="Aprovar Proposta"
                icon={<ThumbsUp />}
                description="Antes de aprovar esta proposta é necessário fazer o cadastro do cliente. Você será direcionado para a tela de cadastro."
                onConfirm={() => {
                  handleActionChange("Aprovar");
                  handleOpenDialog();
                }}
                color="green"
              />
            ) : (
              <Dialog.Trigger>
                <Button
                  onClick={() => {
                    handleActionChange("Aprovar");
                  }}
                  disabled={selectedRowData?.situacao != "Pendente"}
                  color="green"
                >
                  <ThumbsUp />
                  Aprovar Proposta
                </Button>
              </Dialog.Trigger>
            )}

            <Dialog.Trigger>
              <Button
                onClick={() => {
                  handleActionChange("Recusar");
                }}
                disabled={selectedRowData?.situacao != "Pendente"}
                color="red"
              >
                <ThumbsDown />
                Recusar Proposta
              </Button>
            </Dialog.Trigger>

            <Dialog.Trigger>
              <Button
                onClick={() => {
                  handleActionChange("Cancelar");
                }}
                disabled={selectedRowData?.situacao != "Pendente"}
                color="orange"
                variant="outline"
              >
                <X />
                Cancelar Proposta
              </Button>
            </Dialog.Trigger>
          </div>

          {/* Dialogs */}
          {isDialogOpen &&
            (dialogAction === "Aprovar" && !selectedRowData?.cliente_id ? (
              <div>
                <ClienteDialog
                  key={selectedRowData?.id}
                  proposta_id={selectedRowData?.id as number}
                  data={
                    {
                      id: 0,
                      tipo_pessoa: selectedRowData?.tipo_pessoa,
                      cpf_cnpj: selectedRowData?.cpf_cnpj
                        ? formatCpfCnpj(selectedRowData?.cpf_cnpj)
                        : "",
                      nome_razaoSocial: selectedRowData?.nome_razaoSocial,
                      apelido_nomeFantasia: "",
                      rg_inscricaoEstadual: "",
                      genero: "",
                      email: "",
                      celular: "",
                      cidade_id: 0,
                      cidade: "",
                      estado: "",
                      pais: "",
                      logradouro: "",
                      numero: "",
                      bairro: "",
                      complemento: "",
                      cep: "",
                      origem_id: 0,
                      origem: "",
                      usuarios: [],
                      interesses: [],
                      ramos: [],
                      ativo: true,
                      data_cadastro: "",
                      data_ult_alt: "",
                    } as Cliente
                  }
                  action={"Cadastrar"}
                  controller={clientesController}
                  origensController={origensController}
                  cidadesController={cidadesController}
                  usuariosController={usuariosController}
                  interessesController={interessesController}
                  ramosAtividadeController={ramosAtividadeController}
                  isOpenModal={isDialogOpen}
                  // onSuccess={() => {
                  //   handleSuccess();
                  //   handleOpenDialog();
                  //   setDialogAction("Aprovar");
                  // }}
                  onSuccess={handleSuccess}
                />
              </div>
            ) : (
              <PropostaDialog
                key={selectedRowData?.id}
                data={selectedRowData as Proposta}
                action={dialogAction}
                controller={propostasController}
                clientesController={clientesController}
                peridiocidadesController={peridiocidadesController}
                servicosController={servicosController}
                isOpenModal={isDialogOpen}
                onSuccess={handleSuccess}
              />
            ))}
        </Flex>

        <DataTable
          type="propostas"
          columns={PropostasColumns(false)}
          onRowSelectionChange={handleRowSelectionChange}
          controller={propostasController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

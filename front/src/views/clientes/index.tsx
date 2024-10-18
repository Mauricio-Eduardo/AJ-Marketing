import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Pencil, Plus, Trash, X } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { Cliente } from "../../models/cliente/entity/Cliente";
import { ClientesController } from "../../controllers/clientes-controller";
import { ClientesColumns } from "../../components/datatable/columns/clientes-columns";
import { ClienteDialog } from "../../components/dialogs/cliente/cliente-dialog";
import { RamosAtividadeController } from "../../controllers/ramosAtividade-controller";
import { InteressesController } from "../../controllers/interesses-controller";
import { UsuariosController } from "../../controllers/usuarios-controller";
import { OrigensController } from "../../controllers/origens-controller";
import { CidadesController } from "../../controllers/cidades-controller";

export const ClientesView = () => {
  const clientesController = new ClientesController();
  const origensController = new OrigensController();
  const cidadesController = new CidadesController();
  const usuariosController = new UsuariosController();
  const interessesController = new InteressesController();
  const ramosAtividadeController = new RamosAtividadeController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Cadastrar" | "Editar" | "Excluir" | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<Cliente | undefined>();
  const handleRowSelectionChange = (selectedRow: Cliente) => {
    setSelectedRowData(selectedRow);
  };

  const handleSuccess = () => {
    // Incrementa o refreshKey para forçar o refresh da DataTable
    setRefreshKey((prevKey) => prevKey + 1);
    handleOpenDialog();
  };

  const handleActionChange = (action: "Cadastrar" | "Editar" | "Excluir") => {
    setDialogAction(action);
  };

  const handleOpenDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  return (
    <div className="flex flex-col">
      <Dialog.Root open={isDialogOpen} onOpenChange={handleOpenDialog}>
        <Flex
          justify={"start"}
          direction={"row"}
          gap={"3"}
          className="pb-2 border-b-2 border-b-gray-200"
        >
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
              disabled={!selectedRowData?.id}
            >
              <Pencil />
              Editar
            </Button>
          </Dialog.Trigger>

          <Dialog.Trigger>
            <Button
              onClick={() => {
                handleActionChange("Excluir");
              }}
              disabled={!selectedRowData?.id}
              color="red"
            >
              <Trash />
              Excluir
            </Button>
          </Dialog.Trigger>

          {isDialogOpen && (
            <ClienteDialog
              key={selectedRowData?.id}
              proposta_id={null}
              data={selectedRowData as Cliente}
              action={dialogAction}
              controller={clientesController}
              origensController={origensController}
              cidadesController={cidadesController}
              usuariosController={usuariosController}
              interessesController={interessesController}
              ramosAtividadeController={ramosAtividadeController}
              isOpenModal={isDialogOpen}
              onSuccess={handleSuccess}
            />
          )}
        </Flex>

        <DataTable
          columns={ClientesColumns}
          onRowSelectionChange={handleRowSelectionChange}
          controller={clientesController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

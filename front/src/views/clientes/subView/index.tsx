import { MagnifyingGlass, Pencil, Plus, Trash, X } from "@phosphor-icons/react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { DataTable } from "../../../components/datatable";
import { SubDialogProps } from "../../../components/dialogs/DialogProps";
import { Cliente } from "../../../models/cliente/entity/Cliente";
import { ClienteDialog } from "../../../components/dialogs/cliente/cliente-dialog";
import { ClientesColumns } from "../../../components/datatable/columns/clientes-columns";
import { OrigensController } from "../../../controllers/origens-controller";
import { CidadesController } from "../../../controllers/cidades-controller";
import { UsuariosController } from "../../../controllers/usuarios-controller";
import { InteressesController } from "../../../controllers/interesses-controller";
import { RamosAtividadeController } from "../../../controllers/ramosAtividade-controller";

export const ClientesSubView = ({ onClose, controller }: SubDialogProps) => {
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

  const [selectedRowData, setSelectedRowData] = useState<any>({});
  const handleRowSelectionChange = (selectedRow: any) => {
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
      <Dialog.Root>
        <Dialog.Trigger>
          <Button type="button">
            <MagnifyingGlass weight="bold" />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content
          maxWidth={"1200px"}
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
        >
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

              {/* Editar */}
              <Dialog.Trigger>
                <Button
                  onClick={() => {
                    handleActionChange("Editar");
                  }}
                  disabled={!selectedRowData.id}
                >
                  <Pencil />
                  Editar
                </Button>
              </Dialog.Trigger>

              {/* Excluir */}
              <Dialog.Trigger>
                <Button
                  onClick={() => {
                    handleActionChange("Excluir");
                  }}
                  disabled={!selectedRowData.id}
                  color="red"
                >
                  <Trash />
                  Excluir
                </Button>
              </Dialog.Trigger>

              {isDialogOpen && (
                <Dialog.Content
                  maxWidth={"900px"}
                  onInteractOutside={(e) => {
                    e.preventDefault();
                  }}
                  onEscapeKeyDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="flex justify-between">
                    <Dialog.Title>{dialogAction} Proposta</Dialog.Title>

                    <Dialog.Close>
                      <X />
                    </Dialog.Close>
                  </div>
                  <ClienteDialog
                    key={selectedRowData?.id}
                    data={selectedRowData as Cliente}
                    action={dialogAction}
                    controller={controller}
                    origensController={origensController}
                    cidadesController={cidadesController}
                    usuariosController={usuariosController}
                    interessesController={interessesController}
                    ramosAtividadeController={ramosAtividadeController}
                    isOpenModal={isDialogOpen}
                    onSuccess={handleSuccess}
                  />
                </Dialog.Content>
              )}
            </Flex>

            <DataTable
              columns={ClientesColumns}
              onRowSelectionChange={handleRowSelectionChange}
              controller={controller}
              refreshKey={refreshKey}
            />
          </Dialog.Root>

          <div className="flex w-full justify-end gap-3">
            <Dialog.Close>
              <Button variant="outline">Cancelar</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={() => onClose(selectedRowData)}>
                Selecionar
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

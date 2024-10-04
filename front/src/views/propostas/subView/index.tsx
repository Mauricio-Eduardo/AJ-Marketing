import { MagnifyingGlass, Pencil, Plus, Trash, X } from "@phosphor-icons/react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { DataTable } from "../../../components/datatable";
import { SubDialogProps } from "../../../components/dialogs/DialogProps";
import { PropostaDialog } from "../../../components/dialogs/proposta/proposta-dialog";
import { Proposta } from "../../../models/proposta/entity/Proposta";
import { PropostasColumns } from "../../../components/datatable/columns/propostas-columns";
import { PropostasController } from "../../../controllers/propostas-controller";
import { ClientesController } from "../../../controllers/clientes-controller";
import { PeridiocidadesController } from "../../../controllers/peridiocidades-controller";
import { ServicosController } from "../../../controllers/servicos-controller";

export const PropostasSubView = ({
  onClose,
  controller,
  disabled,
}: SubDialogProps) => {
  const propostasController = new PropostasController();
  const clientesController = new ClientesController();
  const peridiocidadesController = new PeridiocidadesController();
  const servicosController = new ServicosController();

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
          <Button type="button" disabled={disabled}>
            <MagnifyingGlass weight="bold" />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content
          maxWidth={"1000px"}
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
                  maxWidth={"1000px"}
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
                </Dialog.Content>
              )}
            </Flex>

            <DataTable
              type="propostasSub"
              columns={PropostasColumns(true)}
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

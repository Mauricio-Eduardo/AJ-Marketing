import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Pencil, Plus, ThumbsDown, ThumbsUp, X } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { PropostasController } from "../../controllers/propostas-controller";
import { Proposta } from "../../models/proposta/entity/Proposta";
import { ServicosController } from "../../controllers/servicos-controller";
import { PropostaDialog } from "../../components/dialogs/proposta/proposta-dialog";
import { PropostasColumns } from "../../components/datatable/columns/propostas-columns";
import { PeridiocidadesController } from "../../controllers/peridiocidades-controller";
import { ClientesController } from "../../controllers/clientes-controller";

export const PropostasView = () => {
  const propostasController = new PropostasController();
  const clientesController = new ClientesController();
  const peridiocidadesController = new PeridiocidadesController();
  const servicosController = new ServicosController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Cadastrar" | "Editar" | "Aprovar" | "Recusar" | null
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
    action: "Cadastrar" | "Editar" | "Aprovar" | "Recusar"
  ) => {
    setDialogAction(action);
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
                disabled={!selectedRowData?.id}
              >
                <Pencil />
                Editar
              </Button>
            </Dialog.Trigger>
          </div>
          <div className="flex gap-3">
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
          </div>

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
          type="propostas"
          columns={PropostasColumns}
          onRowSelectionChange={handleRowSelectionChange}
          controller={propostasController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

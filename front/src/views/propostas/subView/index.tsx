import { Eye, MagnifyingGlass, X } from "@phosphor-icons/react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { DataTable } from "../../../components/datatable";
import { SubDialogProps } from "../../../components/dialogs/DialogProps";
import { PropostaDialog } from "../../../components/dialogs/proposta/proposta-dialog";
import { Proposta } from "../../../models/proposta/entity/Proposta";
import { PropostasColumns } from "../../../components/datatable/columns/propostas-columns";
import { PropostasController } from "../../../controllers/propostas-controller";
import { ClientesController } from "../../../controllers/clientes-controller";
import { ServicosController } from "../../../controllers/servicos-controller";
import { CondicoesPagamentoController } from "../../../controllers/condicoesPagamento-controller";
import { PeridiocidadesController } from "../../../controllers/peridiocidades-controller";

export const PropostasSubView = ({
  onClose,
  controller,
  disabled,
}: SubDialogProps) => {
  const propostasController = new PropostasController();
  const clientesController = new ClientesController();
  const condicoesPagamentoController = new CondicoesPagamentoController();
  const peridiocidadesController = new PeridiocidadesController();
  const servicosController = new ServicosController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Visualizar" | "Cancelar" | null
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

  const handleActionChange = (action: "Visualizar" | "Cancelar") => {
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
              justify={"between"}
              direction={"row"}
              className="pb-2 border-b-2 border-b-gray-200"
            >
              <div className="space-x-3">
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
                <Dialog.Trigger>
                  <Button
                    onClick={() => {
                      handleActionChange("Cancelar");
                    }}
                    disabled={!selectedRowData?.id}
                    color="orange"
                    variant="outline"
                  >
                    <X />
                    Cancelar Proposta
                  </Button>
                </Dialog.Trigger>
              </div>

              {isDialogOpen && (
                <PropostaDialog
                  key={selectedRowData?.id}
                  data={selectedRowData as Proposta}
                  action={dialogAction}
                  controller={propostasController}
                  clientesController={clientesController}
                  condicoesPagamentoController={condicoesPagamentoController}
                  peridiocidadesController={peridiocidadesController}
                  servicosController={servicosController}
                  isOpenModal={isDialogOpen}
                  onSuccess={handleSuccess}
                />
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

import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Eye, Plus, ThumbsDown } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { ContratosController } from "../../controllers/contratos-controller";
import { Contrato } from "../../models/contrato/entity/Contrato";
import { ContratosColumns } from "../../components/datatable/columns/contratos-columns";
import { PropostasController } from "../../controllers/propostas-controller";
import { ContratoDialog } from "../../components/dialogs/contrato/contrato-dialog";

export const ContratosView = () => {
  const contratosController = new ContratosController();
  const propostasController = new PropostasController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Cadastrar" | "Cancelar" | "Visualizar" | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<
    Contrato | undefined
  >();
  const handleRowSelectionChange = (selectedRow: Contrato) => {
    setSelectedRowData(selectedRow);
  };

  const handleSuccess = () => {
    // Incrementa o refreshKey para forçar o refresh da DataTable
    setRefreshKey((prevKey) => prevKey + 1);
    handleOpenDialog();
  };

  const handleActionChange = (
    action: "Cadastrar" | "Cancelar" | "Visualizar"
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
                disabled={
                  !selectedRowData?.id &&
                  selectedRowData?.situacao === "Cancelado"
                }
                color="red"
              >
                <ThumbsDown />
                Cancelar Contrato
              </Button>
            </Dialog.Trigger>
          </div>

          {isDialogOpen && (
            <ContratoDialog
              key={selectedRowData?.id}
              data={selectedRowData as Contrato}
              action={dialogAction}
              controller={contratosController}
              propostasController={propostasController}
              isOpenModal={isDialogOpen}
              onSuccess={handleSuccess}
            />
          )}
        </Flex>

        <DataTable
          type="contratos"
          columns={ContratosColumns}
          onRowSelectionChange={handleRowSelectionChange}
          controller={contratosController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

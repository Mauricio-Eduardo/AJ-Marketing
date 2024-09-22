import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Pencil, Plus, ThumbsDown } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { ContratosController } from "../../controllers/contratos-controller";
import { CondicoesPagamentoController } from "../../controllers/condicoesPagamento-controller";
import { Contrato } from "../../models/contrato/entity/Contrato";
import { ContratosColumns } from "../../components/datatable/columns/contratos-columns";
import { ContratosStepper } from "../../components/stepper/contratos-stepper";
import { PeridiocidadesController } from "../../controllers/peridiocidades-controller";
import { PropostasController } from "../../controllers/propostas-controller";
import { ServicosController } from "../../controllers/servicos-controller";

export const ContratosView = () => {
  const contratosController = new ContratosController();
  const propostasController = new PropostasController();
  const peridiocidadesController = new PeridiocidadesController();
  const servicosController = new ServicosController();
  const condicoesPagamentoController = new CondicoesPagamentoController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Cadastrar" | "Cancelar" | null
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

  const handleActionChange = (action: "Cadastrar" | "Cancelar") => {
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
          </div>
          <div className="flex gap-3">
            <Dialog.Trigger>
              <Button
                onClick={() => {
                  handleActionChange("Cancelar");
                }}
                disabled={selectedRowData?.situacao != "Cancelar"}
                color="red"
              >
                <ThumbsDown />
                Cancelar Contrato
              </Button>
            </Dialog.Trigger>
          </div>

          {isDialogOpen && (
            <ContratosStepper
              key={selectedRowData?.id}
              data={selectedRowData as Contrato}
              action={dialogAction}
              controller={contratosController}
              propostasController={propostasController}
              condicoesPagamentoController={condicoesPagamentoController}
              peridiocidadesController={peridiocidadesController}
              servicosController={servicosController}
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

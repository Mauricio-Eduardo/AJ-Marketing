import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Pencil, Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { PeridiocidadeDialog } from "../../components/dialogs/peridiocidade/peridiocidade-dialog";
import { Peridiocidade } from "../../models/peridiocidade/entity/Peridiocidade";
import { PeridiocidadesColumns } from "../../components/datatable/columns/peridiocidades-columns";
import { PeridiocidadesController } from "../../controllers/peridiocidades-controller";

export const PeridiocidadesView = () => {
  const peridiocidadesController = new PeridiocidadesController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Cadastrar" | "Editar" | "Excluir" | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<
    Peridiocidade | undefined
  >();
  const handleRowSelectionChange = (selectedRow: Peridiocidade) => {
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
            <PeridiocidadeDialog
              key={selectedRowData?.id}
              data={selectedRowData as Peridiocidade}
              action={dialogAction}
              controller={peridiocidadesController}
              isOpenModal={isDialogOpen}
              onSuccess={handleSuccess}
            />
          )}
        </Flex>

        <DataTable
          columns={PeridiocidadesColumns}
          onRowSelectionChange={handleRowSelectionChange}
          controller={peridiocidadesController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

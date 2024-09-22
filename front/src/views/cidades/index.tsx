import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Pencil, Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { CidadesColumns } from "../../components/datatable/columns/cidades-columns";
import { CidadesController } from "../../controllers/cidades-controller";
import { EstadosController } from "../../controllers/estados-controller";
import { Cidade } from "../../models/cidade/entity/Cidade";
import { CidadeDialog } from "../../components/dialogs/cidade/cidade-dialog";

export const CidadesView = () => {
  const cidadesController = new CidadesController();
  const estadosController = new EstadosController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Cadastrar" | "Editar" | "Excluir" | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<Cidade | undefined>();
  const handleRowSelectionChange = (selectedRow: Cidade) => {
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
            <CidadeDialog
              key={selectedRowData?.id}
              data={selectedRowData as Cidade}
              action={dialogAction}
              controller={cidadesController}
              subController={estadosController}
              isOpenModal={isDialogOpen}
              onSuccess={handleSuccess}
            />
          )}
        </Flex>

        <DataTable
          columns={CidadesColumns}
          onRowSelectionChange={handleRowSelectionChange}
          controller={cidadesController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

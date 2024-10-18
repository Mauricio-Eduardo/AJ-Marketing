import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Eye, Pencil } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { UsuariosController } from "../../controllers/usuarios-controller";
import { OrdensServicoController } from "../../controllers/ordensServico-controller";
import { OrdemServico } from "../../models/ordemServico/entity/OrdemServico";
import { OrdemServicoDialog } from "../../components/dialogs/ordemServico/ordemServico-dialog";
import { OrdensServicoColumns } from "../../components/datatable/columns/ordensServico-columns";

export const OrdensServicoView = () => {
  const ordensServicoController = new OrdensServicoController();
  const usuariosController = new UsuariosController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Editar" | "Visualizar" | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<
    OrdemServico | undefined
  >();
  const handleRowSelectionChange = (selectedRow: OrdemServico) => {
    setSelectedRowData(selectedRow);
  };

  const handleSuccess = () => {
    // Incrementa o refreshKey para forçar o refresh da DataTable
    setRefreshKey((prevKey) => prevKey + 1);
    handleOpenDialog();
  };

  const handleActionChange = (action: "Editar" | "Visualizar" | null) => {
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
                  handleActionChange("Editar");
                }}
                disabled={selectedRowData?.situacao === "Cancelada"}
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

          {/* Dialogs */}
          {isDialogOpen && (
            <OrdemServicoDialog
              key={selectedRowData?.id}
              data={selectedRowData as OrdemServico}
              action={dialogAction}
              controller={ordensServicoController}
              usuariosController={usuariosController}
              isOpenModal={isDialogOpen}
              onSuccess={handleSuccess}
            />
          )}
        </Flex>

        <DataTable
          type="ordensServicos"
          columns={OrdensServicoColumns}
          onRowSelectionChange={handleRowSelectionChange}
          controller={ordensServicoController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

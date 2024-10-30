import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Eye, Pencil, Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { UsuariosController } from "../../controllers/usuarios-controller";
import { UsuariosColumns } from "../../components/datatable/columns/usuarios-columns";
import { UsuarioDialog } from "../../components/dialogs/usuario/usuario-dialog";
import { Usuario } from "../../models/usuario/entity/Usuario";

export const UsuariosView = () => {
  const usuariosController = new UsuariosController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Cadastrar" | "Editar" | "Visualizar" | "Excluir" | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<Usuario | undefined>();
  const handleRowSelectionChange = (selectedRow: Usuario) => {
    setSelectedRowData(selectedRow);
  };

  const handleSuccess = () => {
    // Incrementa o refreshKey para forçar o refresh da DataTable
    setRefreshKey((prevKey) => prevKey + 1);
    handleOpenDialog();
  };

  const handleActionChange = (
    action: "Cadastrar" | "Editar" | "Visualizar" | "Excluir"
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
          gap={"3"}
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

          <div className="space-x-3">
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
          </div>
        </Flex>

        {isDialogOpen && (
          <UsuarioDialog
            key={selectedRowData?.id}
            data={selectedRowData as Usuario}
            action={dialogAction}
            controller={usuariosController}
            isOpenModal={isDialogOpen}
            onSuccess={handleSuccess}
          />
        )}

        <DataTable
          columns={UsuariosColumns}
          onRowSelectionChange={handleRowSelectionChange}
          controller={usuariosController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

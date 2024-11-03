import {
  Eye,
  MagnifyingGlass,
  Pencil,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { DataTable } from "../../../components/datatable";
import { SubDialogProps } from "../../../components/dialogs/DialogProps";
import { UsuarioDialog } from "../../../components/dialogs/usuario/usuario-dialog";
import { Usuario } from "../../../models/usuario/entity/Usuario";
import { UsuariosColumns } from "../../../components/datatable/columns/usuarios-columns";

export const UsuariosSubView = ({
  onClose,
  controller,
  disabled,
}: SubDialogProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Cadastrar" | "Editar" | "Visualizar" | null
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

  const handleActionChange = (
    action: "Cadastrar" | "Editar" | "Visualizar"
  ) => {
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
            </Flex>

            {isDialogOpen && (
              <UsuarioDialog
                key={selectedRowData?.id}
                data={selectedRowData as Usuario}
                action={dialogAction}
                controller={controller}
                isOpenModal={isDialogOpen}
                onSuccess={handleSuccess}
              />
            )}

            <DataTable
              columns={UsuariosColumns}
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

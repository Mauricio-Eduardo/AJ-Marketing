import { Eye, MagnifyingGlass, Pencil, Plus } from "@phosphor-icons/react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { DataTable } from "../../../components/datatable";
import { EstadoDialog } from "../../../components/dialogs/estado/estado-dialog";
import { EstadosColumns } from "../../../components/datatable/columns/estados-columns";
import { SubDialogProps } from "../../../components/dialogs/DialogProps";
import { Estado } from "../../../models/estado/entity/Estado";

export const EstadosSubView = ({
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

              {/* Editar */}
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
                    handleActionChange("Visualizar");
                  }}
                  disabled={!selectedRowData?.id}
                  variant="outline"
                >
                  <Eye />
                  Visualizar
                </Button>
              </Dialog.Trigger>

              <EstadoDialog
                data={selectedRowData as Estado}
                action={dialogAction}
                controller={controller}
                isOpenModal={isDialogOpen}
                onSuccess={handleSuccess}
              />
            </Flex>

            <DataTable
              columns={EstadosColumns}
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

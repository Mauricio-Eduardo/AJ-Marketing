import { Eye, MagnifyingGlass, Pencil, Plus } from "@phosphor-icons/react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { DataTable } from "../../../components/datatable";
import { SubArrayDialogProps } from "../../../components/dialogs/DialogProps";
import { RamoAtividadeDialog } from "../../../components/dialogs/ramoAtividade/ramoAtividade-dialog";
import { RamoAtividade } from "../../../models/ramoAtividade/entity/RamoAtividade";
import { RamosAtividadeColumns } from "../../../components/datatable/columns/ramosAtividade-columns";

export const RamosAtividadeSubView = ({
  index,
  onClose,
  controller,
  disabled,
}: SubArrayDialogProps) => {
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

              {/* Excluir */}
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

              <RamoAtividadeDialog
                data={selectedRowData as RamoAtividade}
                action={dialogAction}
                controller={controller}
                isOpenModal={isDialogOpen}
                onSuccess={handleSuccess}
              />
            </Flex>

            <DataTable
              columns={RamosAtividadeColumns}
              onRowSelectionChange={handleRowSelectionChange}
              controller={controller}
              refreshKey={refreshKey}
            />
          </Dialog.Root>

          <div className="flex w-full justify-end gap-3">
            <Dialog.Close>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                type="submit"
                onClick={() => onClose(index, selectedRowData)}
              >
                Selecionar
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

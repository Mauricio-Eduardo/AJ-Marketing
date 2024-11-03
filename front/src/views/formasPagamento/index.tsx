import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Eye, Pencil, Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { FormasPagamentoController } from "../../controllers/formasPagamento-controller";
import { FormasPagamentoColumns } from "../../components/datatable/columns/formaPagamento-columns";
import { FormaPagamento } from "../../models/formaPagamento/entity/FormaPagamento";
import { FormaPagamentoDialog } from "../../components/dialogs/formaPagamento/formaPagamento-dialog";

export const FormasPagamentoView = () => {
  const formasPagamentoController = new FormasPagamentoController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Cadastrar" | "Editar" | "Excluir" | "Visualizar" | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<
    FormaPagamento | undefined
  >();
  const handleRowSelectionChange = (selectedRow: FormaPagamento) => {
    setSelectedRowData(selectedRow);
  };

  const handleSuccess = () => {
    // Incrementa o refreshKey para forçar o refresh da DataTable
    setRefreshKey((prevKey) => prevKey + 1);
    handleOpenDialog();
  };

  const handleActionChange = (
    action: "Cadastrar" | "Editar" | "Excluir" | "Visualizar"
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

          {isDialogOpen && (
            <FormaPagamentoDialog
              key={selectedRowData?.id}
              data={selectedRowData as FormaPagamento}
              action={dialogAction}
              controller={formasPagamentoController}
              isOpenModal={isDialogOpen}
              onSuccess={handleSuccess}
            />
          )}
        </Flex>

        <DataTable
          columns={FormasPagamentoColumns}
          onRowSelectionChange={handleRowSelectionChange}
          controller={formasPagamentoController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

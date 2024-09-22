import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Pencil, Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { CondicoesPagamentoColumns } from "../../components/datatable/columns/condicoesPagamento-columns";
import { CondicoesPagamentoController } from "../../controllers/condicoesPagamento-controller";
import { CondicaoPagamento } from "../../models/condicaoPagamento/entity/CondicaoPagamento";
import { CondicaoPagamentoDialog } from "../../components/dialogs/condicaoPagamento/condicaoPagamento-dialog";
import { FormasPagamentoController } from "../../controllers/formasPagamento-controller";

import "react-toastify/dist/ReactToastify.css";

export const CondicoesPagamentoView = () => {
  const condicoesPagamentoController = new CondicoesPagamentoController();
  const formasPagamentoController = new FormasPagamentoController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "Cadastrar" | "Editar" | "Excluir" | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<
    CondicaoPagamento | undefined
  >();
  const handleRowSelectionChange = (selectedRow: CondicaoPagamento) => {
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
            <CondicaoPagamentoDialog
              key={selectedRowData?.id}
              data={selectedRowData as CondicaoPagamento}
              action={dialogAction}
              controller={condicoesPagamentoController}
              isOpenModal={isDialogOpen}
              onSuccess={handleSuccess}
              subController={formasPagamentoController}
            />
          )}
        </Flex>

        <DataTable
          columns={CondicoesPagamentoColumns}
          onRowSelectionChange={handleRowSelectionChange}
          controller={condicoesPagamentoController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

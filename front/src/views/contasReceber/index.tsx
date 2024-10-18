import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Eye, Money } from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { ContaReceberDialog } from "../../components/dialogs/contaReceber/contaReceber-dialog";
import { ContaReceber } from "../../models/contaReceber/entity/ContaReceber";
import { ContasReceberController } from "../../controllers/contasReceber-controller";
import { ContasReceberColumns } from "../../components/datatable/columns/contasReceber-columns";
import { FormasPagamentoController } from "../../controllers/formasPagamento-controller";

export const ContasReceberView = () => {
  const contasReceberController = new ContasReceberController();
  const formasPagamentoController = new FormasPagamentoController();

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogAction, setDialogAction] = useState<
    "Visualizar" | "Receber" | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<
    ContaReceber | undefined
  >();
  const handleRowSelectionChange = (selectedRow: ContaReceber) => {
    setSelectedRowData(selectedRow);
  };

  const handleSuccess = () => {
    // Incrementa o refreshKey para forçar o refresh da DataTable
    setRefreshKey((prevKey) => prevKey + 1);
    handleOpenDialog();
  };

  const handleActionChange = (action: "Visualizar" | "Receber") => {
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
                handleActionChange("Receber");
              }}
              disabled={
                !selectedRowData?.id &&
                selectedRowData?.situacao != "Recebida" &&
                selectedRowData?.situacao != "Cancelada"
              }
              color="green"
            >
              <Money />
              Receber
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
        </Flex>

        {isDialogOpen && (
          <ContaReceberDialog
            key={selectedRowData?.id}
            data={selectedRowData as ContaReceber}
            action={dialogAction}
            controller={contasReceberController}
            formasPagamentoController={formasPagamentoController}
            isOpenModal={isDialogOpen}
            onSuccess={handleSuccess}
          />
        )}

        <DataTable
          type="contasReceber"
          columns={ContasReceberColumns}
          onRowSelectionChange={handleRowSelectionChange}
          controller={contasReceberController}
          refreshKey={refreshKey}
        />
      </Dialog.Root>
    </div>
  );
};

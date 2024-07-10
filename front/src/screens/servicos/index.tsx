import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Pencil, Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../components/datatable";
import { IndeterminateCheckbox } from "../../components/datatable/IndeterminateCheckbox";
import { IServicos } from "../../interfaces/IServicos";
import { ServicoDialog } from "../../components/dialogs/servico-dialog";

export const ServicosScreen = () => {
  // Aqui é definido as colunas que terão na tabela juntamente com o tamanho que cada coluna deve ocupar
  const ServicosColumns = React.useMemo<ColumnDef<IServicos>[]>(
    () => [
      {
        id: "select",
        size: 10,
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        id: "servico_ID",
        size: 10,
        accessorFn: (row) => row.servico_ID,
        header: () => <span>Código</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        id: "servico",
        size: 100,
        accessorFn: (row) => row.servico,
        header: () => <span>Serviço</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        id: "valor",
        size: 100,
        accessorFn: (row) => row.valor,
        header: () => <span>Valor</span>,
        cell: (info) => {
          const value = info.getValue() as number; // Asserção de tipo
          return value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
        footer: (props) => props.column.id,
      },
      {
        id: "ativo",
        size: 100,
        accessorFn: (row) => row.ativo,
        header: () => <span>Ativo</span>,
        cell: (info) => {
          const isActive = info.getValue(); // Obtém o valor booleano
          return isActive ? "Sim" : "Não"; // Converte para 'Sim' se verdadeiro, 'Não' se falso
        },
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  // Define o tipo do formulário: Cadastrar, Editar ou Excluir
  const [action, setAction] = useState<string>("");
  const handleActionChange = (newAction: string) => {
    setAction(newAction);
  };

  // Aqui seta a action e ela só vai ser alterada quando fechar/abrir a modal
  // Fiz isso porque estava com problemas para setar de outra forma
  const [pendingAction, setPendingAction] = useState<string>("");
  const handleOpenModal = () => {
    if (pendingAction) {
      handleActionChange(pendingAction);
    }
  };

  const [selectedRowData, setSelectedRowData] = useState<any>({});
  const handleRowSelectionChange = (selectedRow: any) => {
    setSelectedRowData(selectedRow);
  };

  return (
    <div className="flex flex-col">
      <Dialog.Root onOpenChange={handleOpenModal}>
        <Flex
          justify={"start"}
          direction={"row"}
          gap={"3"}
          className="pb-2 border-b-2 border-b-gray-200"
        >
          {/* Botões que abrem a modal */}

          {/* Cadastrar */}
          <Dialog.Trigger>
            <Button
              onClick={() => {
                setPendingAction("Cadastrar");
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
                setPendingAction("Editar");
              }}
              disabled={!selectedRowData.servico_ID}
            >
              <Pencil />
              Editar
            </Button>
          </Dialog.Trigger>

          {/* Excluir */}
          <Dialog.Trigger>
            <Button
              onClick={() => {
                setPendingAction("Excluir");
              }}
              disabled={!selectedRowData.servico_ID}
              color="red"
            >
              <Trash />
              Excluir
            </Button>
          </Dialog.Trigger>
        </Flex>

        {/* Aqui chama a DataTable e passa os dados e a Modal como parâmetro */}
        <DataTable
          ChildModal={ServicoDialog}
          columns={ServicosColumns}
          action={action}
          onRowSelectionChange={handleRowSelectionChange}
          apiUrl="/GetAllServicos"
        />
      </Dialog.Root>
    </div>
  );
};

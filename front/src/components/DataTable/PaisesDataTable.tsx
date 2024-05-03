import React from "react";
import { DataTableTemplate } from "./DataTableTemplate";
import { ColumnDef } from "@tanstack/react-table";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { format } from "date-fns";

export type Paises = {
  pais_ID: number;
  pais: string;
  ddi: string;
  ativo: boolean;
  data_cadastro: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir o valor
  data_ult_alt: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir/alterar o valor
};

export const PaisesDataTable = () => {
  const PaisesColumns = React.useMemo<ColumnDef<Paises>[]>(
    () => [
      {
        id: "select",
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
        header: "Países",
        footer: (props) => props.column.id,
        columns: [
          {
            id: "pais_ID",
            accessorFn: (row) => row.pais_ID,
            // accessorKey: "estado_ID",
            header: () => <span>Código</span>,
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "pais",
            accessorFn: (row) => row.pais,
            header: () => <span>Nome</span>,
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "ddi",
            accessorFn: (row) => row.ddi,
            header: () => <span>DDI</span>,
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Detalhes",
        footer: (props) => props.column.id,
        columns: [
          {
            id: "ativo",
            accessorFn: (row) => row.ativo,
            header: () => <span>Ativo?</span>,
            cell: (info) => {
              const isActive = info.getValue(); // Obtém o valor booleano
              return isActive ? "Sim" : "Não"; // Converte para 'Sim' se verdadeiro, 'Não' se falso
            },
            footer: (props) => props.column.id,
          },
          {
            id: "data_cadastro",
            accessorFn: (row) => row.data_cadastro,
            header: () => <span>Cadastro</span>,
            cell: (info) => {
              const date = new Date(info.getValue()); // Parse para objeto Date
              return format(date, "dd/MM/yyyy HH:mm"); // Formata a data no formato desejado
            },
            footer: (props) => props.column.id,
          },
          {
            id: "data_ult_alt",
            accessorFn: (row) => row.data_ult_alt,
            header: () => <span>Última Alteração</span>,
            cell: (info) => {
              const date = new Date(info.getValue()); // Parse para objeto Date
              return format(date, "dd/MM/yyyy HH:mm"); // Formata a data no formato desejado
            },
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <DataTableTemplate
        tableName="paises"
        apiUrl="Paises/getAllPaisesAtivos"
        columns={PaisesColumns}
      />
    </div>
  );
};

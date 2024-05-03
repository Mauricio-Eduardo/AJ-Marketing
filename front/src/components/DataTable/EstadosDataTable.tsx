import React from "react";
import { DataTableTemplate } from "./DataTableTemplate";
import { ColumnDef } from "@tanstack/react-table";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { format } from "date-fns";

export type Estados = {
  estado_ID: number;
  estado: string;
  uf: string;
  pais_ID: number;
  pais: string;
  ativo: boolean; // se der b.o trocar para string
  data_cadastro: string;
  data_ult_alt: string;
};

export const EstadosDataTable = () => {
  const EstadosColumns = React.useMemo<ColumnDef<Estados>[]>(
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
        header: "Estados",
        footer: (props) => props.column.id,
        columns: [
          {
            id: "estado_ID",
            accessorFn: (row) => row.estado_ID,
            header: () => <span>Código</span>,
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "estado",
            accessorFn: (row) => row.estado,
            header: () => <span>Nome</span>,
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "uf",
            accessorFn: (row) => row.uf,
            header: () => <span>UF</span>,
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "pais",
            accessorFn: (row) => row.pais,
            header: () => <span>País</span>,
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
        tableName="estados"
        apiUrl="Estados/getAllEstadosAtivos"
        columns={EstadosColumns}
      />
    </div>
  );
};

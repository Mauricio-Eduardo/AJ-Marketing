import React from "react";
import { DataTableTemplate } from "./DataTableTemplate";
import { ColumnDef } from "@tanstack/react-table";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { format } from "date-fns";

export type Cidades = {
  cidade_ID: number;
  cidade: string;
  ddd: string;
  estado_ID: number;
  estado: string;
  ativo: boolean;
  data_cadastro: string;
  data_ult_alt: string;
};

export const CidadesDataTable = () => {
  const CidadesColumns = React.useMemo<ColumnDef<Cidades>[]>(
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
        header: "Cidades",
        footer: (props) => props.column.id,
        columns: [
          {
            id: "cidade_ID",
            accessorFn: (row) => row.cidade_ID,
            header: () => <span>Código</span>,
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "cidade",
            accessorFn: (row) => row.cidade,
            header: () => <span>Nome</span>,
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "ddd",
            accessorFn: (row) => row.ddd,
            header: () => <span>UF</span>,
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
        tableName="cidades"
        apiUrl="Cidades/getAllCidadesAtivas"
        columns={CidadesColumns}
      />
    </div>
  );
};

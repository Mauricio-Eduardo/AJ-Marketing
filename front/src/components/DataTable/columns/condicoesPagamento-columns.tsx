import { ColumnDef } from "@tanstack/react-table";
import { CondicaoPagamento } from "../../../models/condicaoPagamento/entity/CondicaoPagamento";

export const CondicoesPagamentoColumns: ColumnDef<CondicaoPagamento>[] = [
  {
    id: "id",
    size: 50,
    accessorFn: (row) => row.id,
    header: () => <span className="text-center w-full">Código</span>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "condicaoPagamento",
    size: 200,
    accessorFn: (row) => row.condicaoPagamento,
    header: ({ column }) => (
      <div className="flex flex-col">
        <span>Condição de Pagamento</span>
        <input
          type="text"
          value={(column.getFilterValue() as string) || ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm w-56 font-normal rounded"
        />
      </div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "quantidadeParcelas",
    size: 150,
    accessorFn: (row) => row.quantidadeParcelas,
    header: () => <span className="text-center w-full">Qtd. Parcelas</span>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "juros",
    size: 100,
    accessorFn: (row) => row.juros,
    header: () => <span className="text-center w-full">% Juros</span>,
    cell: (info) => {
      const value = info.getValue() as number;
      return (
        <div className="text-center">
          {value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    },
    footer: (props) => props.column.id,
  },
  {
    id: "multa",
    size: 100,
    accessorFn: (row) => row.multa,
    header: () => <span className="text-center w-full">% Multa</span>,
    cell: (info) => {
      const value = info.getValue() as number;
      return (
        <div className="text-center">
          {value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    },
    footer: (props) => props.column.id,
  },
  {
    id: "desconto",
    size: 100,
    accessorFn: (row) => row.desconto,
    header: () => <span className="text-center w-full">% Desconto</span>,
    cell: (info) => {
      const value = info.getValue() as number;
      return (
        <div className="text-center">
          {value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    },
    footer: (props) => props.column.id,
  },
  {
    id: "ativo",
    size: 100,
    accessorFn: (row) => Boolean(row.ativo),
    header: ({ column }) => (
      <div className="flex flex-col w-full items-center">
        <span>Ativo</span>
        <select
          value={(column.getFilterValue() as string) || " "}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm font-normal rounded mt-2"
        >
          <option value="">Todos</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
    ),
    cell: (info) => {
      const isActive = info.getValue();
      return <div className="text-center">{isActive ? "Sim" : "Não"}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId);
      if (filterValue === "") {
        return true;
      }
      const filterBoolean = filterValue === "true";
      return rowValue === filterBoolean;
    },
    footer: (props) => props.column.id,
  },
];

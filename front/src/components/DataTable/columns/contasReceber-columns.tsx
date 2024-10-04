import { ColumnDef } from "@tanstack/react-table";
import { ContaReceber } from "../../../models/contaReceber/entity/ContaReceber";

export const ContasReceberColumns: ColumnDef<ContaReceber>[] = [
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
    id: "nome_razaoSocial",
    size: 200,
    accessorFn: (row) => row.nome_razaoSocial,
    header: ({ column }) => (
      <div className="flex flex-col">
        <span>Cliente</span>
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
    id: "numeroParcela",
    size: 150,
    accessorFn: (row) => row.numeroParcela,
    header: () => <span className="text-center w-full">N. Parcela</span>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "data_vencimento",
    size: 100,
    accessorFn: (row) => row.data_vencimento,
    header: () => <span className="text-center w-full">Vencimento</span>,
    cell: (info) => {
      return <div className="text-center">{String(info.getValue())}</div>;
    },
    footer: (props) => props.column.id,
  },
  {
    id: "valor_pago",
    size: 100,
    accessorFn: (row) => row.valor_pago,
    header: () => <span className="text-center w-full">Pago</span>,
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
    id: "valor_aberto",
    size: 100,
    accessorFn: (row) => row.valor_aberto,
    header: () => <span className="text-center w-full">A pagar</span>,
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
    id: "situacao",
    size: 100,
    accessorFn: (row) => row.situacao,
    header: ({ column }) => (
      <div className="flex flex-col items-center w-full">
        <span>Situação</span>
        <select
          defaultValue="Vigente"
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm font-normal rounded"
        >
          <option value="">Todas</option>
          <option value="Pendente">Pendente</option>
          <option value="Paga">Paga</option>
          <option value="Parcial">Parcial</option>
          <option value="Paga">Cancelada</option>
        </select>
      </div>
    ),
    cell: (info) => {
      const situacao = String(info.getValue());
      const colorClass =
        situacao === "Vigente"
          ? "text-green-500"
          : situacao === "Cancelado"
          ? "text-red-500"
          : "";

      return (
        <div className={`text-center font-bold ${colorClass}`}>{situacao}</div>
      );
    },
    footer: (props) => props.column.id,
  },
];

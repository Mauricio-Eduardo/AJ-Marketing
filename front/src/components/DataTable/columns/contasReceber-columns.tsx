import { ColumnDef } from "@tanstack/react-table";
import { ContaReceber } from "../../../models/contaReceber/entity/ContaReceber";
import { format } from "date-fns";

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
    size: 500,
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
    id: "parcela",
    size: 50,
    accessorFn: (row) => `${row.numeroParcela}/${row.quantidadeParcelas}`, // Combina os valores
    header: () => <span className="text-center w-full">Parcela</span>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "contrato_id",
    size: 50,
    accessorFn: (row) => row.contrato_id,
    // header: () => <span className="text-center w-full">Contrato</span>,
    header: ({ column }) => (
      <div className="flex flex-col">
        <span>Contrato</span>
        <input
          type="text"
          value={(column.getFilterValue() as string) || ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 w-full text-sm font-normal rounded"
        />
      </div>
    ),
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
      const value = info.getValue() as Date;
      return <div className="text-center">{format(value, "dd/MM/yyyy")}</div>;
    },
    footer: (props) => props.column.id,
  },
  {
    id: "total",
    size: 100,
    accessorFn: (row) => row.total,
    header: () => <span className="text-center w-full">Total</span>,
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
          defaultValue=""
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm font-normal rounded"
        >
          <option value="">Todas</option>
          <option value={["Pendente", "Parcial"]}>Pendente</option>
          <option value="Recebida">Recebida</option>
          <option value="Parcial">Parcial</option>
          <option value="Paga">Cancelada</option>
        </select>
      </div>
    ),
    cell: (info) => {
      const situacao = String(info.getValue());
      const colorClass =
        situacao === "Recebida"
          ? "text-green-500"
          : situacao === "Cancelada"
          ? "text-red-500"
          : situacao === "Parcial"
          ? "text-yellow-500"
          : "";

      return (
        <div className={`text-center font-bold ${colorClass}`}>{situacao}</div>
      );
    },
    footer: (props) => props.column.id,
  },
];

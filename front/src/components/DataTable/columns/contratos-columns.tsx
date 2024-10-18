import { ColumnDef } from "@tanstack/react-table";
import { formatCpfCnpj } from "../../form/Formats";
import { Contrato } from "../../../models/contrato/entity/Contrato";
import { format } from "date-fns";

export const ContratosColumns: ColumnDef<Contrato>[] = [
  {
    id: "id",
    size: 50,
    accessorFn: (row) => row.id,
    header: () => <span className="text-center">Código</span>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "nome_razaoSocial",
    accessorFn: (row) => row.nome_razaoSocial,
    header: ({ column }) => (
      <div className="flex flex-col">
        <span>Nome/Razão Social</span>
        <input
          type="text"
          value={(column.getFilterValue() as string) || ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm font-normal rounded"
        />
      </div>
    ),
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    id: "cpf_cnpj",
    accessorFn: (row) => row.cpf_cnpj,
    header: ({ column }) => (
      <div className="flex flex-col">
        <span>CPF/CNPJ</span>
        <input
          type="text"
          maxLength={14}
          value={(column.getFilterValue() as string) || ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm w-32 font-normal rounded"
        />
      </div>
    ),
    cell: (info) => formatCpfCnpj(String(info.getValue())),
    footer: (props) => props.column.id,
  },
  {
    id: "condicaoPagamento",
    accessorFn: (row) => row.condicaoPagamento,
    header: ({ column }) => (
      <div className="flex flex-col">
        <span>Cond. Pagamento</span>
        <input
          type="text"
          maxLength={14}
          value={(column.getFilterValue() as string) || ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm w-32 font-normal rounded"
        />
      </div>
    ),
    cell: (info) => formatCpfCnpj(String(info.getValue())),
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
          <option value="Vigente">Vigente</option>
          <option value="Cancelado">Cancelado</option>
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

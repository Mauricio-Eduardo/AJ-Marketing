import { ColumnDef } from "@tanstack/react-table";
import { Proposta } from "../../../models/proposta/entity/Proposta";
import { format } from "date-fns";
import { formatCpfCnpj } from "../../form/Formats";

export const PropostasColumns: ColumnDef<Proposta>[] = [
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
    id: "data_proposta",
    size: 150,
    accessorFn: (row) => row.data_proposta,
    header: () => <span className="text-center w-full">Data Proposta</span>,
    cell: (info) => (
      <div className="text-center">
        {format(new Date(String(info.getValue())), "dd/MM/yyyy")}
      </div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "prazo_final",
    size: 200,
    accessorFn: (row) => row.prazo_final,
    header: () => <span className="text-center w-full">Prazo Final</span>,
    cell: (info) => (
      <div className="text-center">
        {format(new Date(String(info.getValue())), "dd/MM/yyyy")}
      </div>
    ),
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
          defaultValue="Pendente"
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm font-normal rounded"
        >
          <option value="">Todas</option>
          <option value="Pendente">Pendente</option>
          <option value="Aprovada">Aprovada</option>
          <option value="Recusada">Recusada</option>
          <option value="Vencida">Vencida</option>
        </select>
      </div>
    ),
    cell: (info) => {
      const situacao = String(info.getValue());
      const colorClass =
        situacao === "Aprovada"
          ? "text-green-500"
          : situacao === "Recusada"
          ? "text-red-500"
          : situacao === "Vencida"
          ? "text-orange-500"
          : "";

      return (
        <div className={`text-center font-bold ${colorClass}`}>{situacao}</div>
      );
    },
    footer: (props) => props.column.id,
  },
];

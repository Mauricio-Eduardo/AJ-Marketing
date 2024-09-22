import { ColumnDef } from "@tanstack/react-table";
import { Cliente } from "../../../models/cliente/entity/Cliente";
import { formatCpfCnpj, formatPhone } from "../../form/Formats";

export const ClientesColumns: ColumnDef<Cliente>[] = [
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
    size: 300,
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
    id: "celular",
    accessorFn: (row) => row.celular,
    header: ({ column }) => (
      <div className="flex flex-col items-center">
        <span>Celular</span>
        <input
          type="text"
          value={(column.getFilterValue() as string) || ""}
          maxLength={11}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm w-32 font-normal rounded"
        />
      </div>
    ),
    cell: (info) => (
      <div className="text-center">{formatPhone(String(info.getValue()))}</div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "cidade",
    size: 500,
    accessorFn: (row) => row.cidade,
    header: ({ column }) => (
      <div className="flex flex-col">
        <span>Cidade</span>
        <input
          type="text"
          value={(column.getFilterValue() as string) || ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm w-56 font-normal rounded"
        />
      </div>
    ),
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    id: "estado",
    size: 300,
    accessorFn: (row) => row.estado,
    header: ({ column }) => (
      <div className="flex flex-col">
        <span>Estado</span>
        <input
          type="text"
          value={(column.getFilterValue() as string) || ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm w-56 font-normal rounded"
        />
      </div>
    ),
    cell: (info) => info.getValue(),
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

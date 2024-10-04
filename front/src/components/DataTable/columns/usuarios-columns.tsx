import { ColumnDef } from "@tanstack/react-table";
import { Usuario } from "../../../models/usuario/entity/Usuario";

export const UsuariosColumns: ColumnDef<Usuario>[] = [
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
    id: "nome",
    size: 400,
    accessorFn: (row) => row.nome,
    header: ({ column }) => (
      <div className="flex flex-col w-full">
        <span>Nome</span>
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
    id: "email",
    size: 400,
    accessorFn: (row) => row.email,
    header: ({ column }) => (
      <div className="flex flex-col w-full">
        <span>E-mail</span>
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
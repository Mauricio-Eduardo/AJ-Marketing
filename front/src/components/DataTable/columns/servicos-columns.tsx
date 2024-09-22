import { ColumnDef } from "@tanstack/react-table";
import { Servico } from "../../../models/servico/entity/Servico";

export const ServicosColumns: ColumnDef<Servico>[] = [
  {
    id: "id",
    accessorFn: (row) => row.id,
    size: 50,
    header: () => <span className="text-center w-full">Código</span>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "servico",
    size: 400,
    accessorFn: (row) => row.servico,
    header: ({ column }) => (
      <div className="flex flex-col w-full">
        <span>Serviço</span>
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
    id: "valor",
    size: 200,
    accessorFn: (row) => row.valor,
    header: () => <span>Valor</span>,
    cell: (info) => {
      const value = info.getValue() as number; // Asserção de tipo
      return value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
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

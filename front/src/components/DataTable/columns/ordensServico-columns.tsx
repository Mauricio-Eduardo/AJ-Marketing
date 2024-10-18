import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { OrdemServico } from "../../../models/ordemServico/entity/OrdemServico";

export const OrdensServicoColumns: ColumnDef<OrdemServico>[] = [
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
    id: "servico",
    accessorFn: (row) => row.servico,
    header: ({ column }) => (
      <div className="flex flex-col">
        <span>Serviço</span>
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
    id: "nome",
    size: 200,
    accessorFn: (row) => row.nome,
    header: () => <span className="text-center w-full">Responsável</span>,
    cell: (info) => (
      <div className="text-center">
        {info.getValue() ? String(info.getValue()) : "-"}
      </div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "data_prazo",
    size: 200,
    accessorFn: (row) => row.data_prazo,
    header: () => <span className="text-center w-full">Prazo</span>,
    cell: (info) => (
      <div className="text-center">
        {format(new Date(String(info.getValue())), "dd/MM/yyyy")}
      </div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "data_entrega",
    size: 200,
    accessorFn: (row) => row.data_entrega,
    header: () => <span className="text-center w-full">Entrega</span>,
    cell: (info) => (
      <div className="text-center">
        {info.getValue()
          ? format(new Date(String(info.getValue())), "dd/MM/yyyy")
          : "-"}
      </div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "situacao",
    size: 150,
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
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>
    ),
    cell: (info) => {
      const situacao = String(info.getValue());
      const colorClass =
        situacao === "Em andamento"
          ? "text-blue-500"
          : situacao === "Concluído"
          ? "text-green-500"
          : "";

      return (
        <div className={`text-center font-bold ${colorClass}`}>{situacao}</div>
      );
    },
    footer: (props) => props.column.id,
  },
  {
    id: "postado",
    size: 100,
    accessorFn: (row) => row.postado,
    header: ({ column }) => (
      <div className="flex flex-col items-center w-full">
        <span>Postado</span>
        <select
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-2 text-sm font-normal rounded"
        >
          <option value="">Todas</option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </select>
      </div>
    ),
    cell: (info) => {
      const situacao = String(info.getValue());
      const colorClass =
        situacao === "Sim"
          ? "text-green-500"
          : situacao === "Não"
          ? "text-red-500"
          : "";

      return (
        <div className={`text-center font-bold ${colorClass}`}>{situacao}</div>
      );
    },
    footer: (props) => props.column.id,
  },
];

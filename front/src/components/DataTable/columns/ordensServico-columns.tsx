import { ColumnDef } from "@tanstack/react-table";
import { differenceInDays, format, isSameDay } from "date-fns";
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
        <span>Cliente</span>
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
    size: 100,
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
    id: "tema",
    size: 250,
    accessorFn: (row) => row.tema,
    header: () => <span>Tema</span>,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    id: "nome",
    size: 200,
    accessorFn: (row) => row.nome,
    header: () => <span className="text-left w-full">Responsável</span>,
    cell: (info) => (
      <div className="text-left">
        {info.getValue() ? String(info.getValue()) : "-"}
      </div>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: "data_prazo",
    size: 90,
    accessorFn: (row) => row.data_prazo,
    header: () => <span className="text-center w-full">Prazo</span>,
    cell: (info) => {
      const dias = differenceInDays(
        new Date(String(info.getValue())),
        new Date()
      );
      const colorClass =
        dias < 0 ? "text-red-500" : dias == 0 ? "text-orange-500" : "";

      return (
        <div className={`text-center font-bold ${colorClass}`}>
          {format(new Date(String(info.getValue())), "dd/MM/yyyy")}
        </div>
      );
    },
    footer: (props) => props.column.id,
  },
  {
    id: "data_entrega",
    size: 90,
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
    header: () => <span className="w-full text-center">Situação</span>,
    cell: (info) => {
      const situacao = String(info.getValue());
      const colorClass =
        situacao === "Em Andamento"
          ? "text-blue-500"
          : situacao === "Pausado"
          ? "text-amber-500"
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
    header: () => <span className="items-center w-full">Postado</span>,
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

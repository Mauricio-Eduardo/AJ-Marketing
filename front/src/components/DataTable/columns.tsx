import { CidadesModal } from "../cidadesModal";
import { EstadosModal } from "../estadosModal";
import { PaisesModal } from "../paisesModal";

export const paisesColumns = [
  {
    accessorKey: "pais_ID",
    header: "Código",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "pais",
    header: "Nome do País",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "ddi",
    header: "DDI",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: (props: any) => (
      <div className="flex gap-2 justify-center">
        <PaisesModal
          tableProps={{
            pais_ID: props.row.original.pais_ID,
            pais: props.row.original.pais,
            ddi: props.row.original.ddi,
          }}
          title="Editar"
        />
        <PaisesModal
          tableProps={{
            pais_ID: props.row.original.pais_ID,
            pais: props.row.original.pais,
            ddi: props.row.original.ddi,
          }}
          title="Excluir"
          color="red"
        />
      </div>
    ),
  },
];

export const estadosColumns = [
  {
    accessorKey: "estado_ID",
    header: "Código",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "estado",
    header: "Nome do Estado",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "uf",
    header: "UF",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "pais_ID",
    header: "País",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: (props: any) => (
      <div className="flex gap-2 justify-center">
        <EstadosModal
          tableProps={{
            estado_ID: props.row.original.pais_ID,
            estado: props.row.original.estado,
            pais_ID: props.row.original.pais_ID,
            uf: props.row.original.uf,
          }}
          title="Editar"
        />
        <EstadosModal
          tableProps={{
            estado_ID: props.row.original.pais_ID,
            estado: props.row.original.estado,
            pais_ID: props.row.original.pais_ID,
            uf: props.row.original.uf,
          }}
          title="Excluir"
          color="red"
        />
      </div>
    ),
  },
];

export const cidadesColumns = [
  {
    accessorKey: "cidade_ID",
    header: "Código",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "cidade",
    header: "Nome da Cidade",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "ddd",
    header: "DDD",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "estado_ID",
    header: "Estado",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: (props: any) => (
      <div className="flex gap-2 justify-center">
        <CidadesModal
          tableProps={{
            cidade_ID: props.row.original.cidade_ID,
            estado_ID: props.row.original.estado_ID,
            cidade: props.row.original.cidade,
            ddd: props.row.original.ddd,
          }}
          title="Editar"
        />
        <CidadesModal
          tableProps={{
            cidade_ID: props.row.original.cidade_ID,
            estado_ID: props.row.original.estado_ID,
            cidade: props.row.original.cidade,
            ddd: props.row.original.ddd,
          }}
          title="Excluir"
          color="red"
        />
      </div>
    ),
  },
];

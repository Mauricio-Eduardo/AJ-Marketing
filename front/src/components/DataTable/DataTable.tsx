import {
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { cidadesColumns, estadosColumns, paisesColumns } from "./columns";
import { PaisesModal } from "../paisesModal";
import { EstadosModal } from "../estadosModal";
import { CidadesModal } from "../cidadesModal";
import { Flex, TabNav } from "@radix-ui/themes";

interface DataTableProps {
  tableName: string; // nome da tabela que será exibida
}

interface TableConfig {
  apiUrl: string;
  columns: {
    accessorKey: string;
    header: string;
    cell: (props: any) => JSX.Element;
  }[];
}

const tableConfigurations: Record<string, TableConfig> = {
  paises: {
    apiUrl: "https://localhost:7179/api/Paises/getAllPaises",
    columns: paisesColumns, // Supondo que paisesColumns seja definido externamente
  },
  estados: {
    apiUrl: "https://localhost:7179/api/Estados/getAllEstados",
    columns: estadosColumns, // Supondo que paisesColumns seja definido externamente
  },
  cidades: {
    apiUrl: "https://localhost:7179/api/Cidades/getAllCidades",
    columns: cidadesColumns, // Supondo que paisesColumns seja definido externamente
  },
  // Adicione outras tabelas aqui com suas configurações correspondentes
};

const fetchData = (apiUrl: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (apiUrl) {
      axios
        .get(apiUrl)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error Fetching the data", error);
        });
    }
  }, [apiUrl]);

  return data;
};

export const DataTable = ({ tableName }: DataTableProps) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); //manage your own row selection state
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  useEffect(() => {
    if (tableName && tableConfigurations[tableName]) {
      setTableConfig(tableConfigurations[tableName]);
    }
  }, [tableName]);

  const { apiUrl, columns } = tableConfig || { apiUrl: "", columns: [] };
  const data = fetchData(apiUrl);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope
    state: {
      rowSelection, //pass the row selection state back to the table instance
    },
  });
  return (
    <div className="overflow-x-auto text-center mt-2">
      {/* Vai exibir as opções de acordo com a tableName */}
      {tableName === "paises" && (
        <Flex justify={"start"} gap={"9"}>
          <TabNav.Root>
            <TabNav.Link href="paises" active>
              Paises
            </TabNav.Link>
            <TabNav.Link href="estados">Estados</TabNav.Link>
            <TabNav.Link href="cidades">Cidades</TabNav.Link>
          </TabNav.Root>
          <PaisesModal title="Novo País" />
        </Flex>
      )}

      {tableName === "estados" && (
        <Flex justify={"start"} gap={"9"}>
          <TabNav.Root>
            <TabNav.Link href="paises">Paises</TabNav.Link>
            <TabNav.Link href="estados" active>
              Estados
            </TabNav.Link>
            <TabNav.Link href="cidades">Cidades</TabNav.Link>
          </TabNav.Root>
          <EstadosModal title="Novo Estado" />
        </Flex>
      )}

      {tableName === "cidades" && (
        <Flex justify={"start"} gap={"9"}>
          <TabNav.Root>
            <TabNav.Link href="paises">Paises</TabNav.Link>
            <TabNav.Link href="estados">Estados</TabNav.Link>
            <TabNav.Link href="cidades" active>
              Cidades
            </TabNav.Link>
          </TabNav.Root>
          <CidadesModal title="Nova Cidade" />
        </Flex>
      )}

      <table className="min-w-full ">
        <tbody>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="bg-violet-600" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="p-2 text-xs font-medium text-white uppercase"
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

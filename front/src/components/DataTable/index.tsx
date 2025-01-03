import { useEffect, useState } from "react";
import { Button, Flex } from "@radix-ui/themes";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface TableConfig {
  type?: string;
  columns: ColumnDef<any>[];
  controller: any;
  onRowSelectionChange: (selectedRow: any) => void;
  refreshKey: number;
  disableFilters?: boolean;
}

export const DataTable = ({
  type,
  columns,
  controller,
  onRowSelectionChange,
  refreshKey,
  disableFilters,
}: TableConfig) => {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const getColumnFilters = (): ColumnFiltersState => {
    if (disableFilters) return [];

    switch (type) {
      case "contratos":
        return [
          {
            id: "situacao",
            value: "Vigente",
          },
        ];
      case "propostas":
        return [
          {
            id: "situacao",
            value: "Pendente",
          },
        ];
      case "propostasSub":
        return [
          {
            id: "situacao",
            value: "Aprovada",
          },
        ];

      default:
        return [
          {
            id: "ativo",
            value: "true",
          },
        ];
    }
  };

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    getColumnFilters()
  );

  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true,
  });

  const refresh = () => {
    getAll();
    setSelectedRowId(null);
  };

  useEffect(() => {
    refresh();
  }, [refreshKey]);

  // Desmarcar a linha selecionada quando um filtro de coluna for aplicado
  useEffect(() => {
    setSelectedRowId(null);
  }, [columnFilters]);

  async function getAll() {
    try {
      let result;

      if (type?.startsWith("ordens")) {
        switch (type) {
          case "ordensPendentes":
            result = await controller.getAll("Pendente");
            break;

          case "ordensEmAndamento":
            result = await controller.getAll("Em Andamento");
            break;

          case "ordensPausadas":
            result = await controller.getAll("Pausado");
            break;

          case "ordensConcluidas":
            result = await controller.getAll("Concluído");
            break;

          case "ordensPostados":
            result = await controller.getAllPostados();
            break;

          default:
            result = await controller.getAll("Pendente");
        }
      } else {
        result = await controller.getAll();
      }

      setData(result);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  useEffect(() => {
    if (selectedRowId) {
      const selectedRow = table.getRowModel().rowsById[selectedRowId].original;
      if (selectedRow) {
        onRowSelectionChange(selectedRow);
      }
    } else {
      onRowSelectionChange({});
    }
  }, [selectedRowId, table, onRowSelectionChange]);

  // Render
  return (
    <Flex direction={"column"} gap={"1"}>
      <div className="p-2 border-2 border-gray-200 rounded-lg">
        {/* Table */}
        <table className="w-full rounded-lg text-left overflow-hidden">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-300">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width: `${header.getSize()}px`,
                      }}
                      className="p-2"
                    >
                      <div className="flex gap-2">
                        {header.isPlaceholder ? null : (
                          <>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => {
              const rowClass =
                row.id === selectedRowId
                  ? "bg-violet-200 cursor-pointer"
                  : index % 2 === 0
                  ? "bg-gray-100 cursor-pointer"
                  : "bg-gray-200 cursor-pointer";

              return (
                <tr
                  key={row.id}
                  className={`${rowClass} hover:bg-gray-200 text-sm`}
                  onClick={() => setSelectedRowId(row.id)}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="p-2 truncate overflow-hidden text-ellipsis"
                        style={{
                          width: `${cell.column.getSize()}px`,
                          maxWidth: `${cell.column.getSize()}px`,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={20}
                className="p-2 text-sm text-gray-500 rounded-lg overflow-hidden"
              >
                Total de Registros ({table.getRowModel().rows.length})
              </td>
            </tr>
          </tfoot>
        </table>

        {/* pagination-buttons */}
        <Flex id="pagination-buttons" justify={"center"} gap={"2"}>
          <span className="flex items-center gap-1">
            Ir para a página:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-12"
            />
          </span>
          <Button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </Flex>
      </div>

      <div />
    </Flex>
  );
};

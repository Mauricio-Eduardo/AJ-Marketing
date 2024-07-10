import React, { useEffect, useState } from "react";
import { Button, Flex, Switch } from "@radix-ui/themes";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { api } from "../../config/api";

type TableConfig = {
  ChildModal: any;
  columns: ColumnDef<any>[];
  action: string;
  onRowSelectionChange: (selectedRow: any) => void;
  apiUrl: string;
};

export function DataTable({
  ChildModal,
  columns,
  action,
  onRowSelectionChange,
  apiUrl,
}: TableConfig) {
  // Essas duas const controlam a linha selecionada e salva os dados dela para levar para a modal
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRowData, setSelectedRowData] = useState<any>({});

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, // initial page index
    pageSize: 10, // default page size
  });
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pagination,
    },
    enableRowSelection: true, // enable row selection for all rows
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, // update the pagination state when internal APIs mutate the pagination state
    debugTable: true,
  });

  const [ativo, setAtivo] = useState<boolean>(true);

  const handleFilter = () => {
    setAtivo((prevAtivo) => !prevAtivo);
  };

  // Executa quando a requisiçao for um sucesso
  const handleSuccess = () => {
    getAllData(); // Recarregar dados da tabela após operação bem-sucedida
    setRowSelection({}); // Desmarcar o checkbox
  };

  // Aqui define a função getAll para pegar todos os dados da API (conforme url que for passada nos parametros)
  function getAllData() {
    if (apiUrl) {
      try {
        api
          .get(apiUrl, {
            params: { ativo: ativo ? "1" : "0" },
          })
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            alert(`Erro na requisição: ${String(error)}`);
          });
      } catch (error) {
        alert(`Erro na requisição: ${String(error)}`);
      }
    }
  }

  // Faz o get na api.url passada como parâmetro e armazena na variável data
  useEffect(() => {
    getAllData();
  }, [apiUrl]);

  // Esse useEffect armazena os valores da linha selecionada na variavel "selectedRow" para passar por parametro para a modal
  useEffect(() => {
    if (Object.keys(rowSelection).length > 0) {
      const selectedRowId = Object.keys(rowSelection)[0];
      const selectedRow = table.getRowModel().rowsById[selectedRowId].original;
      if (selectedRow) {
        setSelectedRowData(selectedRow);
        onRowSelectionChange(selectedRow);
      }
    } else {
      setSelectedRowData({});
      onRowSelectionChange({});
    }
    // setOpen(false);
  }, [rowSelection, table, onRowSelectionChange]);

  // Executa toda vez que o ativo é alterado para dar um refresh na DataTable e desmarcar o que está selecionado
  useEffect(() => {
    if (ativo !== undefined) {
      getAllData();
      setRowSelection({});
    }
  }, [ativo]);

  // Render
  return (
    <Flex direction={"column"} gap={"1"}>
      {/* Esse ChildModal vai ser qualquer Modal de Cadastro que for passada como parâmetro, é dinâmico */}

      <ChildModal
        data={selectedRowData}
        action={action}
        onSuccess={handleSuccess}
      />

      <div className="flex gap-3 items-center">
        <input
          className="w-72 text-sm border border-zinc-300 hover:border-violet-600 focus:outline-violet-700 shadow-sm rounded h-8 p-2"
          placeholder="Pesquisar"
        />

        <div className="flex flex-col items-center">
          <label>Ativos?</label>
          <Switch checked={ativo} onCheckedChange={handleFilter} />
        </div>
      </div>

      <div className="p-2 border-2 border-gray-200 rounded-lg">
        {/* Table */}
        <table className="w-full text-center rounded-lg overflow-hidden">
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
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => {
              // Defina a classe de acordo com o índice da linha para alternar as cores de fundo
              const rowClass = index % 2 === 0 ? "bg-gray-100" : "bg-gray-200";

              return (
                <tr
                  key={row.id}
                  className={`${rowClass} hover:bg-gray-200 text-sm`}
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

      {/* <pre>{JSON.stringify(selectedRowData, null, 2)}</pre> */}
      <div />
    </Flex>
  );
}

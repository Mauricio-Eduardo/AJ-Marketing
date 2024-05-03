import React, { useEffect, useState } from "react";
import { Button, Flex, TabNav } from "@radix-ui/themes";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EstadosModal } from "../Modal/EstadosModal";
import { PaisesModal } from "../Modal/PaisesModal";
import { api } from "../../config/api";
import { CidadesModal } from "../Modal/cidadesModal";
import { Link } from "react-router-dom";

type TableConfig = {
  tableName: string;
  apiUrl: string;
  columns: ColumnDef<any>[];
};

export function DataTableTemplate({ tableName, apiUrl, columns }: TableConfig) {
  // Essas duas const controlam a linha selecionada e salva os dados dela para levar para a modal
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRowData, setSelectedRowData] = useState<any>({});

  const [data, setData] = useState([]);

  // const refreshData = () => fetchData();

  // Aqui define a função getAll para pegar todos os dados da API (conforme url que for passada nos parametros)
  function fetchData() {
    if (apiUrl) {
      api
        .get(apiUrl)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error Fetching the data", error);
        });
    }
  }

  // Faz o get na api.url passada como parâmetro e armazena na variável data ou refreshData
  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pagination,
    },
    enableRowSelection: true, //enable row selection for all rows
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    debugTable: true,
  });

  // Esse useEffect armazena os valores da linha selecionada na variavel "selectedRow" para passar por parametro para a modal
  useEffect(() => {
    if (Object.keys(rowSelection).length > 0) {
      const selectedRowId = Object.keys(rowSelection)[0];
      const selectedRow = table.getRowModel().rowsById[selectedRowId].original;
      if (selectedRow) {
        setSelectedRowData(selectedRow);
      }
    } else {
      setSelectedRowData({});
    }
  }, [rowSelection, table]);

  // Render
  return (
    <Flex direction={"column"} gap={"1"}>
      <TabNav.Root>
        <Link to="/paises">
          <TabNav.Link active={tableName === "paises"}>Países</TabNav.Link>
        </Link>
        <Link to="/estados">
          <TabNav.Link active={tableName === "estados"}>Estados</TabNav.Link>
        </Link>
        <Link to="/cidades">
          <TabNav.Link active={tableName === "cidades"}>Cidades</TabNav.Link>
        </Link>
      </TabNav.Root>

      <Flex justify={"start"} gap={"3"} className="items-center">
        {tableName === "paises" && <PaisesModal data={selectedRowData} />}
        {tableName === "estados" && <EstadosModal data={selectedRowData} />}
        {tableName === "cidades" && <CidadesModal data={selectedRowData} />}

        <input
          className="p-2 text-sm shadow border border-violet-500 rounded-lg"
          placeholder="Pesquisar"
        />
      </Flex>

      <div />
      <table className="bg-gray-100 w-full text-center">
        <thead className="bg-violet-600 text-gray-100 text-sm uppercase">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="border-violet-700 border-2 font-inter"
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div>
                            {/* <Filter column={header.column} table={table} /> */}
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="border-white border-2">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
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
            <td colSpan={20}>
              Total de Páginas ({table.getRowModel().rows.length})
            </td>
          </tr>
        </tfoot>
      </table>

      {/* pagination-buttons */}
      <Flex id="pagination-buttons" justify={"center"} gap={"2"}>
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

      <div />

      <div>
        <label>
          Dados Selecionados
          <br />
        </label>
        <pre>{JSON.stringify(selectedRowData)}</pre>
      </div>
    </Flex>
  );
}

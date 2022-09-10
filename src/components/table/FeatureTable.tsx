import React, { useState } from "react";
import Data from "../../data/Data.json";
import { Box, Button, Text, Input, Flex, Select } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./column";
import { Person } from "./column";

const FeatureTable: React.FC = () => {
  const [data, setData] = useState<Person[]>(() => [...Data]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const table = useReactTable({
    data,
    columns: columns,

    state: {
      sorting,

      globalFilter,
    },

    getCoreRowModel: getCoreRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      <Box>
        Search:
        <Input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </Box>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} bg="gray.200">
                  {header.isPlaceholder ? null : (
                    <Box
                      cursor="pointer"
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </Box>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex gap={2}>
        {/* table.getCanPreviousPage() return if prev page posssible , it return true or false , now according to that we will disabled or able the button*/}
        <Button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;&lt;
        </Button>
        <Button
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;
        </Button>
        <Button onClick={table.nextPage} disabled={!table.getCanNextPage()}>
          &gt;
        </Button>

        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          &gt;&gt;
        </Button>
        <Text as="span" pr={4}>
          page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Text>
        <Flex as="span" gap={2}>
          <Text>Go to Page :</Text>
          <Input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </Flex>
        <Text as="span">
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
              (pageSize, index) => (
                <option key={index} value={pageSize}>
                  show {pageSize}
                </option>
              )
            )}
          </Select>
        </Text>
      </Flex>
    </>
  );
};

export default FeatureTable;

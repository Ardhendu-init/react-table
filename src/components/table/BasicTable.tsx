import React from "react";
import Data from "../../data/Data.json";
// import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createTable,
} from "@tanstack/react-table";
import { columns } from "./column";
import { Person } from "./column";

const BasicTable: React.FC = () => {
  const [data, setData] = React.useState<Person[]>(() => [...Data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
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
    </>
  );
};

export default BasicTable;

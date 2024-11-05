import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { TableContainer, TableRow } from "@mui/material";

interface TableProps {
  column?: Array<{ id: string; name: string }> | null;
  children?: React.ReactNode;
  tableHeight?: string;
}

const TableData: React.FC<TableProps> = ({ column, children, tableHeight }) => {
  return (
    <>
      <TableContainer sx={{ maxHeight: tableHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {column &&
                column.map((col, index) => (
                  <TableCell key={col.id} className="font-bold">
                    {col.name}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableData;

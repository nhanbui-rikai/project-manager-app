import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { TableContainer, TableRow, TableSortLabel } from "@mui/material";

interface TableColumn {
  id: string;
  name: string;
}

interface TableProps {
  column?: TableColumn[] | null;
  children?: React.ReactNode;
  tableHeight?: string;
  order?: "asc" | "desc";
  orderBy?: string;
  onRequestSort: (property: string) => void;
  style?: object;
}

const TableData: React.FC<TableProps> = ({
  column,
  children,
  style = {},
  tableHeight,
  order,
  orderBy,
  onRequestSort,
}) => {
  const handleSort = (property: string) => {
    onRequestSort(property);
  };

  return (
    <TableContainer sx={{ maxHeight: tableHeight }} style={style}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {column &&
              column.map((col) => (
                <TableCell key={col.id} className="font-bold max-w-table-cell">
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : "asc"}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.name}
                  </TableSortLabel>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;

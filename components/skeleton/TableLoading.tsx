"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableData from "@/components/Table/Table";
import { Skeleton } from "@mui/material";

const column = [
  { id: "id", name: "ID" },
  { id: "email", name: "Email" },
  { id: "role", name: "Role" },
  { id: "created_at", name: "Created At" },
  { id: "updated_at", name: "Updated At" },
  { id: "action", name: "Action" },
];

export default function TableLoading() {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="border-none shadow-none">
      <Skeleton>
        <TableData column={column} tableHeight="calc(100vh - 200px)">
          {Array(1).map((items, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="rectangular" height={60} />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" height={60} />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" height={60} />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" height={60} />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" height={60} />
              </TableCell>
            </TableRow>
          ))}
        </TableData>
      </Skeleton>

      <Skeleton variant="rectangular" height={60} />
    </Paper>
  );
}

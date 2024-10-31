"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@/components/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useAppSelector } from "@/hooks/useStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

const userData = [
  { id: "1", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "2", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "3", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "4", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "5", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "6", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "7", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "8", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "9", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "11", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "12", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
  { id: "13", email: "admin@example.com", role: "ADMIN", created_at: new Date(), updated_at: new Date() },
];

export default function UserPage() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };
  const {} = useAppSelector((state) => state.app);
  console.log(formatDate(new Date(), "string"));
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="border-none shadow-none bg-transparent">
      <TableContainer sx={{ maxHeight: "calc(100vh - 200px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold bg-slate-50">ID</TableCell>
              <TableCell className="font-bold bg-slate-50">Email</TableCell>
              <TableCell className="font-bold bg-slate-50">Role</TableCell>
              <TableCell className="font-bold bg-slate-50">Created At</TableCell>
              <TableCell className="font-bold bg-slate-50">Updated At</TableCell>
              <TableCell className="font-bold bg-slate-50">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((items, index) => (
              <TableRow key={items.id}>
                <TableCell>{page * rowsPerPage + index + 1 - rowsPerPage}</TableCell>
                <TableCell>{items.email}</TableCell>
                <TableCell>{items.role}</TableCell>
                <TableCell>{`${formatDate(new Date(items.created_at), "string")}`}</TableCell>
                <TableCell>{`${formatDate(new Date(items.updated_at), "string")}`}</TableCell>
                <TableCell>
                  <div className="flex gap-2 w-full h-full">
                    <Button
                      onClick={() => router.push(`/user/id=${items.id}`)}
                      className="bg-transparent text-primary hover:text-primary/90"
                      name={<RemoveRedEyeIcon />}
                    />

                    <Button
                      onClick={() => router.push("")}
                      className="bg-transparent text-danger hover:text-danger/90"
                      name={<DeleteIcon />}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

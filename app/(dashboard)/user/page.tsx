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
import { getAllUser } from "@/api/userService";
import { DocumentData } from "firebase/firestore";

export default function UserPage() {
  const [user, setUser] = React.useState<DocumentData[] | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    getAllUser()
      .then((res) => {
        setLoading(true);
        res ? setUser(res) : setUser(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const {} = useAppSelector((state) => state.app);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="border-none shadow-none">
      <TableContainer sx={{ maxHeight: "calc(100vh - 200px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">ID</TableCell>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="font-bold">Role</TableCell>
              <TableCell className="font-bold">Created At</TableCell>
              <TableCell className="font-bold">Updated At</TableCell>
              <TableCell className="font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user &&
              user.map((items, index) => (
                <TableRow key={items.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{items.email}</TableCell>
                  <TableCell>{items.role}</TableCell>
                  <TableCell>{`${formatDate(new Date(items.created_at), "string")}`}</TableCell>
                  <TableCell>{`${formatDate(new Date(items.updated_at), "string")}`}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 w-full h-full">
                      <Button
                        onClick={() => router.push(`/user/${items.id}`)}
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
      {user && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={user.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@/components/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { UserService } from "@/api/userService";
import { DocumentData } from "firebase/firestore";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TableData from "@/components/Table/Table";
import RenderCondition from "@/components/RederCondition";
import { useTranslation } from "react-i18next";
import MessageBox from "@/components/Dialog";
import { toast } from "react-toastify";
import MessageDialog from "@/components/MessageDialog";

export default function UserPage() {
  const [user, setUser] = React.useState<DocumentData[] | null>(null);
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<string>("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const [selectUser, setSelectUser] = React.useState<any | null>(null);
  const [openDeleteUserModal, setOpenDeleteUserModal] = React.useState(false);
  const { t } = useTranslation();

  const column = [
    { id: "id", name: "ID" },
    { id: "email", name: "Email" },
    { id: "role", name: "Role" },
    { id: "created_at", name: "Created At" },
    { id: "updated_at", name: "Updated At" },
    { id: "action", name: "Action" },
  ];

  const rawCol = column.slice(0, -1);

  const router = useRouter();

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await UserService.getAllUsers();
      setUser(res || null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDetailModal = (items: any) => {
    setOpenDetailModal(true);
    setSelectUser(items);
  };

  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteUserModal(true);
    setSelectUser(id);
  };

  const handleCloseModal = () => {
    setOpenDetailModal(false);
    setOpenDeleteUserModal(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = async () => {
    setDeleteLoading(true);
    try {
      await UserService.deleteUser(selectUser);
      fetchData();
      toast.success(t("message.delete_success"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("message.delete_failure"));
    } finally {
      setDeleteLoading(false);
      setOpenDeleteUserModal(false);
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedUsers = user
    ? [...user].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (aValue < bValue) {
          return order === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return order === "asc" ? 1 : -1;
        }
        return 0;
      })
    : [];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="border-none shadow-none">
      <MessageDialog
        title="Delete this user ?"
        open={openDeleteUserModal}
        loading={deleteLoading}
        onConfirm={deleteUser}
        onClose={handleCloseModal}
      />
      <MessageBox title="Delete this user ?" open={openDeleteUserModal} onClose={handleCloseModal}>
        <Button loading={deleteLoading} onClick={deleteUser} name="Confirm" className="bg-danger" />
        <Button
          loading={deleteLoading}
          onClick={() => setOpenDeleteUserModal(false)}
          name="Cancel"
          className="bg-secondary"
        />
      </MessageBox>

      <MessageBox open={openDetailModal} onClose={handleCloseModal}>
        {selectUser && (
          <TableData
            column={rawCol}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            tableHeight="calc(100vh - 200px)"
          >
            <TableRow>
              <TableCell>{selectUser.id}</TableCell>
              <TableCell>{selectUser.email}</TableCell>
              <TableCell>{selectUser.role}</TableCell>
              <TableCell>{`${formatDate(new Date(selectUser.created_at), "string")}`}</TableCell>
              <TableCell>{`${formatDate(new Date(selectUser.updated_at), "string")}`}</TableCell>
            </TableRow>
          </TableData>
        )}
      </MessageBox>

      <RenderCondition condition={!loading}>
        <TableData
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          column={column}
          tableHeight="calc(100vh - 200px)"
        >
          <RenderCondition condition={Boolean(user)}>
            {sortedUsers.length > 0 &&
              sortedUsers.map((user, index) => (
                <TableRow className="hover:cursor-pointer hover:bg-slate-50/90" key={user.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{`${formatDate(new Date(user.created_at), "string")}`}</TableCell>
                  <TableCell>{`${formatDate(new Date(user.updated_at), "string")}`}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 w-full h-full">
                      <Button
                        onClick={() => handleOpenDetailModal(user)}
                        className="bg-transparent text-primary hover:text-primary/90"
                        name={<RemoveRedEyeIcon />}
                      />
                      <Button
                        onClick={() => router.push("/profile")}
                        name={<EditNoteIcon />}
                        className="bg-transparent text-secondary hover:text-secondary/90"
                      />

                      <Button
                        onClick={() => handleOpenDeleteModal(user.id)}
                        className="bg-transparent text-danger hover:text-danger/90"
                        name={<DeleteIcon />}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </RenderCondition>
        </TableData>
        <RenderCondition condition={!Boolean(user)}>
          <div className="text-center w-full py-2">{t("no_data")}</div>
        </RenderCondition>
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
      </RenderCondition>
    </Paper>
  );
}

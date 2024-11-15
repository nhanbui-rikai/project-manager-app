"use client";
import React, { useEffect } from "react";
import RenderCondition from "@/components/RederCondition";
import TableData from "@/components/Table/Table";
import { formatDate, getStringFromArrayData, getTableId, sortedData } from "@/lib/utils";
import { Box, Modal, TableCell, TablePagination, TableRow, Typography } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { getAllProjects, updateProject } from "@/api/projectService";
import Text from "@/components/Text";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setCurrentProjectData, setProjectData } from "@/lib/store/feature/project.slice";
import CreateProjectModal from "@/components/CreateProjectModal/CreateProjectModal";
import { UserService } from "@/api/userService";
import LoadingSpinner from "@/components/LoadingSpinner";
import MessageDialog from "@/components/MessageDialog";
import { setAppLoading } from "@/lib/store/feature/app.slice";

interface Project {
  id: string;
  project: string;
  desc: string;
  member: string;
  task: string;
  start_date: string;
  end_date: string;
}

type Option = { value: string; label: string };

const ProjectPage = () => {
  const [data, setData] = React.useState<DocumentData[] | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [removeLoading, setRemoveLoading] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState<keyof Project>("project");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [openCreateProjectModal, setOpenCreateProjectModal] = React.useState(false);
  const [memberOptions, setMemberOptions] = React.useState<Option[]>([]);
  const [openRemoveModal, setOpenRemoveModal] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState("");
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isAdmin } = useAppSelector((state) => state.auth);

  const column = [
    { id: "id", name: "ID" },
    { id: "project", name: t("table.project") },
    { id: "desc", name: t("table.description") },
    { id: "member", name: t("table.member") },
    { id: "duration", name: t("table.duration") },
    { id: "action", name: t("table.action") },
  ];
  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      dispatch(setAppLoading(true));
      const res = await getAllProjects();
      const userRes = await UserService.getAllUsers();

      if (userRes) {
        const userArr = userRes.map((user) => {
          return {
            value: user.id || "",
            label: user.user_name || "",
          };
        });
        setMemberOptions(userArr);
      }
      setData(res || null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("msg.error"));
    } finally {
      setLoading(false);
      dispatch(setAppLoading(false));
    }
  };

  const handleDeleteProjects = async () => {
    try {
      setRemoveLoading(true);
      const res = await updateProject(selectedProject, { deleted: true });
      if (res) {
        toast.success(t("msg.success"), {
          position: "top-center",
        });

        fetchData();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("msg.error"));
    } finally {
      setRemoveLoading(false);
      setOpenRemoveModal(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setProjectData(data));
    }
  }, [data, dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property: keyof Project) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClickProject = (id: string) => {
    const filterProjectData = data && data.find((item) => item.id === id);
    dispatch(setCurrentProjectData(filterProjectData));
    router.push(`project/${id}`);
  };

  const handleCloseCreateProjectModal = () => {
    setOpenCreateProjectModal(false);
    setOpenRemoveModal(false);
  };

  const handleCloseModal = () => {
    setOpenRemoveModal(false);
  };

  const handleOpenRemoveProject = (id: string) => {
    setSelectedProject(id);
    setOpenRemoveModal(true);
  };

  const sortedProjects = sortedData(data, orderBy, order);
  return (
    <>
      <MessageDialog
        title="Delete this project ?"
        open={openRemoveModal}
        loading={deleteLoading}
        onConfirm={handleDeleteProjects}
        onClose={handleCloseModal}
      />

      <CreateProjectModal
        fetchData={fetchData}
        memberOptions={memberOptions}
        openCreateProjectModal={openCreateProjectModal}
        handleCloseCreateProjectModal={handleCloseCreateProjectModal}
      />
      <div className="flex justify-between">
        <Typography className="font-bold">{t("app.sidebar.project")}</Typography>
        <Button
          onClick={() => setOpenCreateProjectModal(true)}
          name={t("button.create_project")}
          className="bg-primary text-white"
        />
      </div>
      <RenderCondition condition={!loading}>
        <TableData
          column={column}
          order={order}
          orderBy={orderBy}
          onRequestSort={(property) => handleRequestSort(property as keyof Project)}
          tableHeight="calc(100vh - 200px)"
        >
          <RenderCondition condition={Boolean(data)}>
            {sortedProjects.length > 0 &&
              sortedProjects.map((item, index) => (
                <TableRow className="hover:cursor-pointer hover:bg-slate-50/90" key={item.id}>
                  <TableCell>{getTableId(page, rowsPerPage, index)}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Text maxWidth={100} maxLength={20} text={item.description || "-"} />
                  </TableCell>
                  <TableCell>
                    <Text maxWidth={100} maxLength={20} text={getStringFromArrayData(item.members) || "-"} />
                  </TableCell>
                  <TableCell>
                    {formatDate(item.start_date, "string") || "-"} - {formatDate(item.end_date, "string") || "-"}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2 w-full h-full">
                      <Button
                        onClick={() => handleClickProject(item.id)}
                        className="bg-transparent text-primary hover:text-primary/90"
                        name={<RemoveRedEyeIcon />}
                      />

                      <RenderCondition condition={isAdmin}>
                        <Button
                          onClick={() => handleOpenRemoveProject(item.id)}
                          className="bg-transparent text-danger hover:text-danger/90"
                          name={
                            <>
                              {loading && <LoadingSpinner />} <DeleteIcon />
                            </>
                          }
                        />
                      </RenderCondition>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </RenderCondition>
        </TableData>
        <RenderCondition condition={!Boolean(data)}>
          <div className="text-center w-full py-2">{t("app.no_data")}</div>
        </RenderCondition>
        {data && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </RenderCondition>
    </>
  );
};

export default ProjectPage;

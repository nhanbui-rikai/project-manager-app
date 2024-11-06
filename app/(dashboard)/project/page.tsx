"use client";
import React, { useEffect } from "react";
import RenderCondition from "@/components/RederCondition";
import TableData from "@/components/Table/Table";
import { formatDate, getStringFromArrayData, sortedData } from "@/lib/utils";
import { TableCell, TablePagination, TableRow } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { getAllProjects } from "@/api/projectService";
import Text from "@/components/Text";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useStore";
import { setCurrentProjectData, setProjectData } from "@/lib/store/feature/project.slice";

interface Project {
  id: string;
  project: string;
  desc: string;
  member: string;
  task: string;
  start_date: string;
  end_date: string;
}

const ProjectPage = () => {
  const [data, setData] = React.useState<DocumentData[] | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState<keyof Project>("project");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");

  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const column = [
    { id: "id", name: "ID" },
    { id: "project", name: "Project" },
    { id: "desc", name: "Description" },
    { id: "member", name: "Members" },
    { id: "duration", name: "Duration" },
    { id: "action", name: "Action" },
  ];
  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await getAllProjects();
      setData(res || null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
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
    const filterProjectData = data && data.find((item) => item.id);
    dispatch(setCurrentProjectData(filterProjectData));
    router.push(`project/${id}`);
  };

  const sortedProjects = sortedData(data, orderBy, order);
  return (
    <>
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
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Text maxWidth={100} maxLength={100} text={item.description || "-"} />
                  </TableCell>
                  <TableCell>
                    <Text maxWidth={100} maxLength={100} text={getStringFromArrayData(item.members) || "-"} />
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
                      <Button
                        name={<EditNoteIcon />}
                        className="bg-transparent text-secondary hover:text-secondary/90"
                      />

                      <Button
                        onClick={() => {}}
                        className="bg-transparent text-danger hover:text-danger/90"
                        name={<DeleteIcon />}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </RenderCondition>
        </TableData>
        <RenderCondition condition={!Boolean(data)}>
          <div className="text-center w-full py-2">{t("no_data")}</div>
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
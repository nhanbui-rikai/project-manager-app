"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TableCell, TableRow, Typography, Button } from "@mui/material";
import TextInput from "@/components/TextInput";
import DateInput from "@/components/DateInput";
import TextArea from "@/components/TextArea";
import RenderCondition from "@/components/RederCondition";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import TableData from "@/components/Table/Table";
import Text from "@/components/Text";
import { cn, formatDate, sortedData } from "@/lib/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ButtonApp from "@/components/Button";
import CreateTaskPopup from "@/components/CreateTask";
import { useAppSelector } from "@/hooks/useStore";
import { createTask, getTaskById, updateTask } from "@/api/taskService";
import { toast } from "react-toastify";
import { TaskData, User } from "@/constants/types";
import { updateProject } from "@/api/projectService";
import { Timestamp } from "firebase/firestore";
import LoadingSpinner from "@/components/LoadingSpinner";

interface FormData {
  name: string;
  description: string;
  start_date: Date | string;
  end_date: Date | string;
}

interface Project extends FormData {
  id: string;
  name: string;
  description: string;
  start_date: Date | string;
  end_date: Date | string;
  members: [];
  task: TaskProps[];
}

interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: string;
  assigned_to: string;
  actual_hours: string;
  estimate_hours: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  members: [];
}

const DetailProjectPage: React.FC = () => {
  const [data, setData] = React.useState<FormData | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState<keyof TaskProps>("title");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [isEdit, setIsEdit] = React.useState(false);
  const [taskData, setTaskData] = React.useState<TaskProps[] | null>(null);
  const [createPopup, setCreatePopup] = React.useState<boolean>(false);
  const [editTask, setEditTask] = useState<any>(null);

  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const { currentProjectData } = useAppSelector((state) => state.project);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      name: currentProjectData ? currentProjectData.name : "",
      description: currentProjectData ? currentProjectData.description : "",
      start_date: currentProjectData ? new Date(currentProjectData.start_date).toISOString().split("T")[0] : "",
      end_date: currentProjectData ? new Date(currentProjectData.end_date).toISOString().split("T")[0] : "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const newData = {
        ...data,
        updated_at: Timestamp.fromDate(new Date()),
        start_date: Timestamp.fromDate(new Date(data.start_date)),
        end_date: Timestamp.fromDate(new Date(data.end_date)),
      };

      const res = await updateProject(params.id, newData);
      if (res) {
        toast.success("Update project successfully", {
          position: "top-center",
        });
        setIsEdit(false);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResetError = (field: keyof FormData) => {
    clearErrors([field]);
  };

  React.useEffect(() => {
    if (currentProjectData) {
      setTaskData(currentProjectData.tasks);
    }
  }, [currentProjectData]);

  const column = [
    { id: "id", name: "ID" },
    { id: "title", name: "Title" },
    { id: "description", name: "Description" },
    { id: "status", name: "Status" },
    { id: "actual_hours", name: "Actual Hours" },
    { id: "estimate_hours", name: "Estimate Hours" },
    { id: "due_date", name: "Due Date" },
    { id: "action", name: "Action" },
  ];

  const handleRequestSort = (property: keyof TaskProps) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleCreateTask = ({ values, members }: { values: any; members: any }) => {
    const projectId = params.id;
    const taskIds = currentProjectData?.tasks.map((task) => task.id) || [];
    createTask(values, members, projectId, taskIds)
      .then((res) => {
        toast.success(t("app.createTask.toastSuccess"));

        setTaskData((prev: any) => {
          return [
            ...prev,
            {
              id: res,
              title: values.title,
              description: values.description,
              status: "pending",
              actual_hours: values.actualHour,
              estimate_hours: values.estimatedHour,
              due_date: new Date(),
              created_at: new Date(),
              updated_at: new Date(),
              members,
            },
          ];
        });
      })
      .catch((err) => {
        toast.error(t("app.createTask.toastFail"));
      });
  };

  const handleUpdateTask = ({ values, members }: { values: TaskData; members: Array<User> }) => {
    updateTask(editTask.id, values, members)
      .then((res) => {
        toast.success(t("app.updateTask.toastSuccess"));
        setEditTask(null);
        setTaskData((prev: any) => {
          if (!prev) return [];
          const newState = prev.map((task: any) => {
            if (task.id === editTask.id) {
              return {
                ...task,
                title: values?.title,
                description: values?.description,
                status: values?.status,
                actual_hours: values?.actualHour,
                estimate_hours: values?.estimatedHour,
                due_date: values?.dueDate,
                created_at: values?.createdAt,
                updated_at: new Date(),
              };
            }
            return task;
          });

          return newState;
        });
      })
      .catch((err) => {
        toast.error(t("app.updateTask.toastFail"));
      });
  };

  const sortedProjects = sortedData(taskData, orderBy, order);
  return (
    <>
      <CreateTaskPopup
        open={createPopup}
        onClose={(value) => {
          setCreatePopup(value);
        }}
        onSubmit={handleCreateTask}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-5">
          <Typography className="p-3 font-bold text-xl">Detail Project</Typography>
          <div>
            <RenderCondition condition={isEdit}>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={`${!isEdit && "cursor-not-allowed"}`}
                >
                  <RenderCondition condition={loading}>
                    <LoadingSpinner />
                  </RenderCondition>
                  Submit
                </Button>
                <Button
                  onClick={() => setIsEdit(false)}
                  variant="contained"
                  color="error"
                  className={`${!isEdit && "cursor-not-allowed"}`}
                >
                  Cancel
                </Button>
              </div>
            </RenderCondition>
            <RenderCondition condition={!isEdit}>
              <Button variant="contained" color="secondary" onClick={() => setIsEdit(true)}>
                Edit
              </Button>
            </RenderCondition>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1">
            <TextInput
              label="Name"
              id="name"
              variant="outlined"
              className={`w-full mb-5 ${!isEdit && "cursor-not-allowed"}`}
              disabled={!isEdit}
              showIcon={false}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              {...register("name", {
                required: "Name is required",
              })}
              onBlur={() => handleResetError("name")}
            />

            <div className="flex justify-start gap-10 w-full items-center">
              <DateInput
                label="Start Date"
                id="start_date"
                variant="outlined"
                disabled={!isEdit}
                className={`${!isEdit && "cursor-not-allowed"}`}
                error={!!errors.start_date}
                helperText={errors.start_date ? errors.start_date.message : ""}
                {...register("start_date", { required: "Start Date is required" })}
                onBlur={() => handleResetError("start_date")}
              />

              <DateInput
                label="End Date"
                id="end_date"
                variant="outlined"
                disabled={!isEdit}
                className={`w-full ${!isEdit && "cursor-not-allowed"}`}
                error={!!errors.end_date}
                helperText={errors.end_date ? errors.end_date.message : ""}
                {...register("end_date", { required: "End Date is required" })}
                onBlur={() => handleResetError("end_date")}
              />
            </div>
          </div>
          <div className="col-span-1">
            <TextArea
              label="Description"
              id="description"
              variant="outlined"
              className={`w-full ${!isEdit && "cursor-not-allowed"}`}
              disabled={!isEdit}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
              {...register("description", { required: "Description is required" })}
              onBlur={() => handleResetError("description")}
            />
          </div>
        </div>
        <div className="min-h-96 my-5">
          <Button
            className={`${!isEdit && "cursor-not-allowed"}`}
            disabled={!isEdit}
            variant="contained"
            color="primary"
            onClick={() => setCreatePopup(true)}
          >
            Add Task
          </Button>

          <TableData
            column={column}
            order={order}
            orderBy={orderBy}
            onRequestSort={(property) => handleRequestSort(property as keyof TaskProps)}
            tableHeight="calc(100vh - 200px)"
          >
            <RenderCondition condition={Boolean(taskData)}>
              {sortedProjects.length > 0 &&
                sortedProjects.map((item, index) => (
                  <TableRow className="hover:cursor-pointer hover:bg-slate-50/90" key={item.id}>
                    <TableCell className="max-w-table-cell">{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell className="max-w-table-cell">{item.title}</TableCell>
                    <TableCell className="max-w-table-cell">
                      <Text maxWidth={100} maxLength={100} text={item.description || "-"} />
                    </TableCell>

                    <TableCell className="max-w-table-cell">
                      <Text maxWidth={100} maxLength={100} text={item.status || "-"} />
                    </TableCell>

                    <TableCell className="max-w-table-cell">
                      <Text maxWidth={100} maxLength={100} text={item.actual_hours} />
                    </TableCell>
                    <TableCell className="max-w-table-cell">
                      <Text maxWidth={100} maxLength={100} text={item.estimate_hours || "-"} />
                    </TableCell>

                    <TableCell className="max-w-table-cell">{formatDate(item.due_date, "string") || "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 w-full h-full">
                        <ButtonApp
                          disabled={!isEdit}
                          onClick={() => {
                            getTaskById(item.id)
                              .then((res) => {
                                setEditTask(res);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                          name={<EditNoteIcon />}
                          className={cn(
                            "bg-transparent text-secondary hover:text-secondary/90",
                            !isEdit && "cursor-not-allowed",
                          )}
                        />

                        <ButtonApp
                          disabled={!isEdit}
                          onClick={() => {}}
                          className={cn(
                            "bg-transparent text-danger hover:text-danger/90",
                            !isEdit && "cursor-not-allowed",
                          )}
                          name={<DeleteIcon />}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </RenderCondition>
          </TableData>
          <RenderCondition condition={!Boolean(taskData)}>
            <div className="text-center w-full py-2">{t("app.no_data")}</div>
          </RenderCondition>
        </div>
      </form>

      <CreateTaskPopup // for update
        data={editTask}
        open={editTask !== null}
        onClose={(value) => {
          setEditTask(null);
        }}
        onSubmit={(values) => {
          handleUpdateTask(values);
        }}
      />
    </>
  );
};

export default DetailProjectPage;

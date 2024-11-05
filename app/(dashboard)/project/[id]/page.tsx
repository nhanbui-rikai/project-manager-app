"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { TableCell, TableRow, Typography, Button } from "@mui/material";
import TextInput from "@/components/TextInput";
import DateInput from "@/components/DateInput";
import TextArea from "@/components/TextArea";
import RenderCondition from "@/components/RederCondition";
import { useTranslation } from "react-i18next";
import { useParams, useRouter } from "next/navigation";
import TableData from "@/components/Table/Table";
import Text from "@/components/Text";
import { cn, formatDate, getStringFromArrayData, sortedData } from "@/lib/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ButtonApp from "@/components/Button";
import CreateTaskPopup from "@/components/CreateTask";
import { useAppSelector } from "@/hooks/useStore";

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
  category: string;
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

  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const { currentProjectData, projectData } = useAppSelector((state) => state.project);
  const router = useRouter();

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

  const onSubmit = (data: FormData) => {};

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
    { id: "category", name: "Category" },
    { id: "status", name: "Status" },
    { id: "assigned_to", name: "Members" },
    { id: "actual_hours", name: "Actual Hours" },
    { id: "estimate_hours", name: "Estimate Hours" },
    { id: "due_date", name: "Due Date" },
    { id: "created_at", name: "Created At" },
    { id: "updated_at", name: "Updated At" },
    { id: "action", name: "Action" },
  ];

  const handleRequestSort = (property: keyof TaskProps) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedProjects = sortedData(taskData, orderBy, order);
  return (
    <>
      <CreateTaskPopup
        open={createPopup}
        onClose={(value) => {
          setCreatePopup(value);
        }}
      />
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

      <form onSubmit={handleSubmit(onSubmit)}>
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
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <Text maxWidth={100} maxLength={100} text={item.description || "-"} />
                    </TableCell>
                    <TableCell>
                      <Text maxWidth={100} maxLength={100} text={item.category || "-"} />
                    </TableCell>
                    <TableCell>
                      <Text maxWidth={100} maxLength={100} text={item.status || "-"} />
                    </TableCell>
                    <TableCell>
                      <Text maxWidth={100} maxLength={100} text={getStringFromArrayData(item.members) || "-"} />
                    </TableCell>
                    <TableCell>
                      <Text maxWidth={100} maxLength={100} text={item.actual_hours || "-"} />
                    </TableCell>
                    <TableCell>
                      <Text maxWidth={100} maxLength={100} text={item.estimate_hours || "-"} />
                    </TableCell>

                    <TableCell>{formatDate(item.due_date, "string") || "-"}</TableCell>
                    <TableCell>{formatDate(item.created_at, "string") || "-"}</TableCell>
                    <TableCell>{formatDate(item.updated_at, "string") || "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 w-full h-full">
                        <ButtonApp
                          disabled={!isEdit}
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
            <div className="text-center w-full py-2">{t("no_data")}</div>
          </RenderCondition>
        </div>
      </form>
    </>
  );
};

export default DetailProjectPage;

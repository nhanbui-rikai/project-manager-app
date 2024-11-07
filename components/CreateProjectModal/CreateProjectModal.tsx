import React from "react";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import DateInput from "../DateInput";
import { Box, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import MultiSelector from "../MultiSelector";
import { collection, doc, DocumentReference, Timestamp } from "firebase/firestore";
import { createProject } from "@/api/projectService";
import { toast } from "react-toastify";
import db from "@/lib/firebase/firestore";
import RenderCondition from "../RederCondition";
import LoadingSpinner from "../LoadingSpinner";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  description: string;
  task: string[];
  members: string[];
  start_date: Date | string;
  end_date: Date | string;
}

interface CreateProjectModalProps {
  openCreateProjectModal: boolean;
  handleCloseCreateProjectModal: () => void;
  memberOptions: Array<{ value: string | number; label: string }> | [];
  fetchData: () => void;
}

type ProjectData = Omit<FormData, "start_date" | "end_date" | "task" | "members"> & {
  start_date: Timestamp;
  end_date: Timestamp;
  task?: DocumentReference[] | string[];
  members?: DocumentReference[] | string[];
  deleted?: boolean;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  openCreateProjectModal,
  handleCloseCreateProjectModal,
  memberOptions,
  fetchData,
}) => {
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {},
  });
  const handleResetError = (field: keyof FormData) => {
    clearErrors([field]);
  };

  const onSubmit = async (data: FormData) => {
    const newData: ProjectData = {
      ...data,
      start_date: Timestamp.fromDate(new Date(data.start_date)),
      end_date: Timestamp.fromDate(new Date(data.end_date)),
      deleted: false,
    };

    if (data.members.length > 0) {
      newData.members = data.members.map((memberId) => doc(collection(db, "users"), memberId));
    }
    setLoading(true);
    try {
      const res = await createProject(newData);

      if (res) {
        toast.success("Create project Success", {
          position: "top-center",
        });
        fetchData();
        handleClose();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset({
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      task: [],
      members: [],
    });
    handleCloseCreateProjectModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <React.Fragment>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openCreateProjectModal}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <Typography className="font-bold">Create New Project</Typography>
            </DialogTitle>

            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent className="min-w-96 max-w-4xl" dividers>
              <div className="grid grid-cols-1 gap-5 justify-between w-full">
                <TextInput
                  label="Name"
                  id="name"
                  variant="outlined"
                  className={`w-full col-span-1`}
                  showIcon={false}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  {...register("name", {
                    required: "Name is required",
                  })}
                  onBlur={() => handleResetError("name")}
                />

                <TextArea
                  label="Description"
                  id="description"
                  variant="outlined"
                  className={`w-full col-span-1`}
                  error={!!errors.description}
                  helperText={errors.description ? errors.description.message : ""}
                  {...register("description", { required: "Description is required" })}
                  onBlur={() => handleResetError("description")}
                />

                <DateInput
                  label="Start Date"
                  id="start_date"
                  variant="outlined"
                  error={!!errors.start_date}
                  helperText={errors.start_date ? errors.start_date.message : ""}
                  {...register("start_date", { required: "Start Date is required" })}
                  onBlur={() => handleResetError("start_date")}
                  className="col-span-1"
                />

                <DateInput
                  label="End Date"
                  id="end_date"
                  variant="outlined"
                  error={!!errors.end_date}
                  helperText={errors.end_date ? errors.end_date.message : ""}
                  {...register("end_date", { required: "End Date is required" })}
                  onBlur={() => handleResetError("end_date")}
                  className="col-span-1"
                />

                <Box sx={{ marginBottom: 2 }}>
                  <Controller
                    name="members"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: "Members is required" }}
                    render={({ field }) => (
                      <MultiSelector
                        {...field}
                        label="Members"
                        id="members"
                        variant="outlined"
                        error={!!errors.members}
                        helperText={errors.members ? errors.members.message : ""}
                        onBlur={() => {
                          field.onBlur();
                          handleResetError("members");
                        }}
                        className="col-span-1 w-full"
                        options={memberOptions}
                      />
                    )}
                  />
                </Box>
              </div>
            </DialogContent>
            <DialogActions className="my-2">
              <Button
                className={cn(loading && "hover:cursor-not-allowed")}
                onClick={handleSubmit(onSubmit)}
                type="submit"
                variant="contained"
                color="primary"
              >
                <RenderCondition condition={loading}>
                  <LoadingSpinner className="text-sm" />
                </RenderCondition>
                Submit
              </Button>
              <Button onClick={handleClose} variant="contained" color="inherit">
                Cancel
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </React.Fragment>
      </form>
    </>
  );
};

export default CreateProjectModal;

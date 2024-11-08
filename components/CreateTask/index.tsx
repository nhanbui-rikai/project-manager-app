"use client";
import { TaskContext, TaskFormValues, User } from "@/constants/types";

import {
  Close as CloseIcon,
  FeaturedPlayList as FeaturedPlayListIcon,
  Subject as SubjectIcon,
  Person4Outlined as Person4OutlinedIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  Label as LabelIcon,
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  DateRange as DateRangeIcon,
} from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Dialog from "@mui/material/Dialog";

import { ButtonBoardCard } from "../ButtonBoardCard";
import { createContext, Fragment, useEffect, useState } from "react";
import { Avatar, Button, ClickAwayListener, TextareaAutosize, TextField } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveIcon from "@mui/icons-material/Remove";
import Calendar from "../Calendar";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";

import "./createTask.css";
import AddMember from "../AddMember";
import PopperClickAway from "../PopperClickAway";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks/useStore";
import { useTranslation } from "react-i18next";

export const DetailTaskContext = createContext<TaskContext>({});

export default function CreateTaskPopup({
  open,
  onClose,
  onSubmit,
  data,
}: {
  open: boolean;
  loading?: boolean;
  data?: any;
  onClose: (value: any) => void;
  onSubmit?: (value: any) => void;
}) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  const handleClose = () => {
    onClose(false);
  };

  const handleJoinTask = () => {
    setMembers((prev: any) => {
      const newState = [...prev];
      newState.push(currentUser);
      return newState;
    });
    setIsJoined(true);
  };

  const handleLeaveTask = () => {
    setMembers((prev: any) => {
      let newState = [...prev];
      newState = newState.filter((data) => data.email !== currentUser.email);
      return newState;
    });
    setIsJoined(false);
  };

  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [addMemberPopper, setAddMemberPopper] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [members, setMembers] = useState<Array<User>>(data?.assignedTo || []);

  const taskForm = useForm<TaskFormValues>({
    defaultValues: {
      date: data?.dueDate || new Date(),
      title: data?.title || "",
      description: data?.description || "",
      actualHour: data?.actualHour || 0,
      estimatedHour: data?.estimatedHour || 0,
      isCompleted: data?.status === "completed" ? true : false,
    },
  });

  const { watch } = taskForm;

  const states: TaskContext = {
    currentUser,
    members: members,
    setMembers: setMembers,
  };

  const handleUpdateTask = (values: any) => {
    if (onSubmit) {
      return onSubmit({ values, members });
    }
  };

  useEffect(() => {
    if (data) {
      setMembers(data.assignedTo);
      const isExisted = data.assignedTo.find((user: any) => user.id === currentUser.id) ? true : false;
      setIsJoined(isExisted);
      taskForm.reset({
        date: new Date(data.dueDate),
        title: data.title || "",
        description: data.description || "",
        actualHour: data.actualHour || 0,
        estimatedHour: data.estimatedHour || 0,
        isCompleted: data.status === "completed",
      });
    }
  }, [data, taskForm]);

  return (
    <DetailTaskContext.Provider value={states}>
      <Fragment>
        <Dialog
          sx={{
            width: "100vw",
            height: "100vh",
            "& .MuiDialog-paper": {
              margin: 0,
              width: "90%",
              height: "100%",
              overflowY: "overlay",
            },
            "& .MuiDialog-container": {
              width: "100%",
            },
          }}
          open={open}
          onClose={handleClose}
        >
          <div className="relative flex justify-between bg-white rounded-[8px] p-8 font-medium text-[12px] z-500 h-full content-wrapper">
            <div className="flex-1 p-2">
              <div className="mr-2 mb-3">
                <div className="flex items-center text-[12px] mb-2">
                  <span className="mr-2">{t("app.taskEditor.memberLabel")}</span>
                </div>
                <div className="relative flex items-center justify-start gap-2">
                  {members?.map((item: any, index) => (
                    <Avatar key={index} sx={{ width: 32, height: 32 }}>
                      {item?.userName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  ))}
                  <PopperClickAway
                    open={addMemberPopper}
                    setOpen={setAddMemberPopper}
                    popper={<AddMember onClosePopper={() => setAddMemberPopper(false)} />}
                  >
                    <div
                      onClick={() => setAddMemberPopper(true)}
                      className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] px-3 mr-1 font-bold text-[12px] bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    >
                      <AddIcon style={{ fontSize: "20px" }} />
                    </div>
                  </PopperClickAway>
                </div>
              </div>
              <div className="flex p-2 items-center h-12">
                <div>
                  <FeaturedPlayListIcon fontSize="small" />
                </div>
                <div className="flex-1 ml-4">
                  {editTitle ? (
                    <div>
                      <Controller
                        name="title"
                        control={taskForm.control}
                        render={({ field }) => (
                          <TextField
                            autoFocus
                            onBlur={() => setEditTitle(false)}
                            onChange={field.onChange}
                            value={field.value}
                            sx={{
                              "& .MuiInputBase-input": {
                                paddingY: 1,
                              },
                            }}
                          />
                        )}
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => setEditTitle(true)}
                      className="text-[16px] bg-gray-200 cursor-pointer py-2 pl-2 rounded"
                    >
                      {watch("title") || t("app.taskEditor.titleLabel")}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex p-2">
                <div>
                  <SubjectIcon fontSize="small" />
                </div>
                <div className="flex-1 ml-4">
                  <div className="text-[16px] mb-2">{t("app.taskEditor.descriptionLabel")}</div>
                  {editDescription ? (
                    <div>
                      <Controller
                        name="description"
                        control={taskForm.control}
                        render={({ field }) => (
                          <TextareaAutosize
                            value={field.value}
                            onChange={field.onChange}
                            autoFocus
                            onBlur={() => setEditDescription(false)}
                            style={{
                              borderWidth: "1px",
                              width: "100%",
                            }}
                            minRows={5}
                          />
                        )}
                      />

                      <Button
                        onClick={() => setEditDescription(false)}
                        sx={{ paddingY: 0.5, float: "right" }}
                        variant="contained"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div
                      onClick={() => setEditDescription(true)}
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer w-full text-[14px] mb-2 p-2 pb-6 rounded-[4px]"
                    >
                      <div>{watch("description") || t("app.taskEditor.desciptionExample")}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex p-2 gap-3">
                <div className="flex flex-1 flex-col">
                  <p>{t("app.taskEditor.estimatedHourLabel")}</p>
                  <Controller
                    name="estimatedHour"
                    control={taskForm.control}
                    render={({ field }) => (
                      <TextField
                        value={field.value}
                        onChange={(e) => {
                          if (!isNaN(Number(e.target.value))) field.onChange(e.target.value);
                        }}
                        type="number"
                        placeholder="4"
                        sx={{
                          "& .MuiInputBase-input": {
                            padding: "4px 8px",
                          },
                        }}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <p>{t("app.taskEditor.actualHourLabel")}</p>

                  <Controller
                    name="actualHour"
                    control={taskForm.control}
                    render={({ field }) => (
                      <TextField
                        value={field.value}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        type="number"
                        placeholder="3"
                        sx={{
                          "& .MuiInputBase-input": {
                            padding: "4px 8px",
                          },
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex p-2">
                <div>
                  <DateRangeIcon fontSize="small" />
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between">
                    <div className="text-[16px] mb-2">{t("app.taskEditor.duedateLabel")}</div>
                  </div>
                  <div className="flex items-center text-[12px] mb-2">
                    <Controller
                      name="isCompleted"
                      control={taskForm.control}
                      render={({ field }) => (
                        <input
                          checked={field.value}
                          onChange={(e) => {
                            taskForm.setValue("isCompleted", e.target.checked);
                          }}
                          className="w-4 h-4"
                          type="checkbox"
                        />
                      )}
                    />

                    <div
                      onClick={() => setDatePicker(true)}
                      className="relative flex items-center text-[12px] py-[6px] px-3 bg-[#091E420F] ml-2 cursor-pointer rounded-md"
                    >
                      <span className="text-sm font-semibold text-[#172b4d] ">
                        {watch("date") && moment(watch("date")).format("MMM D, h:mm A")}
                      </span>

                      {datePicker && (
                        <ClickAwayListener onClickAway={() => setDatePicker(false)}>
                          <div className="absolute top-[120%] left-0 z-[999] calendar-wrapper">
                            <Calendar
                              onChange={(e: any) => {
                                const newDate = new Date(e);
                                taskForm.setValue("date", newDate);
                              }}
                            />
                          </div>
                        </ClickAwayListener>
                      )}

                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[180px]">
              <div className="relative flex flex-col items-center mx-2 mt-16 mb-4">
                <ButtonBoardCard
                  onHandleEvent={isJoined ? handleLeaveTask : handleJoinTask}
                  nameBtn={isJoined ? t("app.taskEditor.leaveBtn") : t("app.taskEditor.joinBtn")}
                >
                  {isJoined ? (
                    <RemoveIcon className="ml-1 mr-2" fontSize="small" />
                  ) : (
                    <PersonAddAltIcon className="ml-1 mr-2" fontSize="small" />
                  )}
                </ButtonBoardCard>

                <ButtonBoardCard nameBtn={t("app.taskEditor.memberLabel")}>
                  <Person4OutlinedIcon className="ml-1 mr-2" fontSize="small" />
                </ButtonBoardCard>
                <ButtonBoardCard
                  nameBtn={
                    taskForm.getValues("isCompleted")
                      ? t("app.taskEditor.completedStatus")
                      : t("app.taskEditor.pendingStatus")
                  }
                  onHandleEvent={() => {
                    let isCompleted = watch("isCompleted");
                    taskForm.setValue("isCompleted", !isCompleted);
                  }}
                >
                  {taskForm.getValues("isCompleted") ? (
                    <CheckBoxIcon color="success" className="ml-1 mr-2" fontSize="small" />
                  ) : (
                    <CheckBoxOutlinedIcon className="ml-1 mr-2" fontSize="small" />
                  )}
                </ButtonBoardCard>
                <ButtonBoardCard nameBtn={t("app.taskEditor.duedateLabel")}>
                  <AccessTimeOutlinedIcon className="ml-1 mr-2" fontSize="small" />
                </ButtonBoardCard>

                <Button
                  onClick={taskForm.handleSubmit(handleUpdateTask)}
                  variant="contained"
                  sx={{ py: 0.5, width: "100%", marginTop: 2, textTransform: "none" }}
                >
                  {t("app.taskEditor.saveBtn")}
                </Button>
              </div>
            </div>
            <CloseIcon
              onClick={handleClose}
              className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
            />
          </div>
        </Dialog>
      </Fragment>
    </DetailTaskContext.Provider>
  );
}

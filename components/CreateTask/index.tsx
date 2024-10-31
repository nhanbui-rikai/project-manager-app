"use client";

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

import Dialog from "@mui/material/Dialog";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { ButtonBoardCard } from "../ButtonBoardCard";
import { Fragment, useState } from "react";
import { Avatar, Button, ClickAwayListener, TextareaAutosize, TextField } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveIcon from "@mui/icons-material/Remove";
import Calendar from "../Calendar";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";

import "./createTask.css";

type User = {
  user_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  role: string;
};
export default function CreateTaskPopup({ open, onClose }: { open: boolean; onClose: (value: any) => void }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleJoinTask = () => {
    setMembers((prev: any) => {
      const newState = [...prev];
      newState.push({
        email: "user@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
        role: "member",
        user_name: "Nhan Bui",
      });

      return newState;
    });
  };

  const handleLeaveTask = () => {
    setMembers((prev: any) => {
      const newState = [...prev];
      const filtered = newState.filter((item) => item.email !== "user@gmail.com");
      return filtered;
    });
  };

  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [members, setMembers] = useState<User[]>([]);

  const isJoined = members.find((item) => item.email === "user@gmail.com") ? true : false;
  return (
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="relative flex justify-between bg-white rounded-[8px] p-8 font-medium text-[12px] z-500 h-full content-wrapper">
          <div className="flex-1 p-2">
            <div className="mr-2 mb-3">
              <div className="flex items-center text-[12px] mb-2">
                <span className="mr-2">Members</span>
              </div>
              <div className="relative flex items-center justify-start gap-2">
                {members.map((item, index) => (
                  <Avatar key={index} sx={{ width: 32, height: 32 }}>
                    {item.user_name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                ))}
                <div
                  onClick={() => {}}
                  className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] px-3 mr-1 font-bold text-[12px] bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                  <AddIcon style={{ fontSize: "20px" }} />
                </div>
              </div>
            </div>
            <div className="flex p-2 items-center h-12">
              <div>
                <FeaturedPlayListIcon fontSize="small" />
              </div>
              <div className="flex-1 ml-4">
                {editTitle ? (
                  <div>
                    <TextField
                      autoFocus
                      onBlur={() => setEditTitle(false)}
                      onChange={(e) => setTitle(e.target.value)}
                      sx={{
                        "& .MuiInputBase-input": {
                          paddingY: 1,
                        },
                      }}
                      value={title}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => setEditTitle(true)}
                    className="text-[16px] bg-gray-200 cursor-pointer py-2 pl-2 rounded"
                  >
                    {title || "Title"}
                  </div>
                )}
              </div>
            </div>
            <div className="flex p-2">
              <div>
                <SubjectIcon fontSize="small" />
              </div>
              <div className="flex-1 ml-4">
                <div className="text-[16px] mb-2">Describe</div>
                {editDescription ? (
                  <div>
                    <TextareaAutosize
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      autoFocus
                      onBlur={() => setEditDescription(false)}
                      style={{
                        borderWidth: "1px",
                        width: "100%",
                      }}
                      minRows={5}
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
                    <div>{description || "Add more detailed description..."}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex p-2">
              <div>
                <DateRangeIcon fontSize="small" />
              </div>
              <div className="flex-1 ml-4">
                <div className="flex justify-between">
                  <div className="text-[16px] mb-2">Due Date</div>
                </div>
                <div className="flex items-center text-[12px] mb-2">
                  <input className="w-4 h-4" type="checkbox" />

                  <div
                    onClick={() => setDatePicker(true)}
                    className="relative flex items-center text-[12px] py-[6px] px-3 bg-[#091E420F] ml-2 cursor-pointer rounded-md"
                  >
                    <span className="text-sm font-semibold text-[#172b4d] ">
                      {date && moment(date).format("MMM D, h:mm A")}
                    </span>

                    {datePicker && (
                      <ClickAwayListener onClickAway={() => setDatePicker(false)}>
                        <div className="absolute top-[120%] left-0 z-[999] calendar-wrapper">
                          <Calendar
                            onChange={(e: any) => {
                              const newDate = new Date(e);
                              setDate(newDate);
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
                nameBtn={isJoined ? "Leave" : "Join"}
              >
                {isJoined ? (
                  <RemoveIcon className="ml-1 mr-2" fontSize="small" />
                ) : (
                  <PersonAddAltIcon className="ml-1 mr-2" fontSize="small" />
                )}
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={"Members"}>
                <Person4OutlinedIcon className="ml-1 mr-2" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={"What to do"}>
                <CheckBoxOutlinedIcon className="ml-1 mr-2" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={"Day"}>
                <AccessTimeOutlinedIcon className="ml-1 mr-2" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={"Label"}>
                <LabelIcon className="ml-1 mr-2" fontSize="small" />
              </ButtonBoardCard>
              <Button variant="contained" sx={{ py: 0.5, width: "100%", marginTop: 2, textTransform: "none" }}>
                Save
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
  );
}

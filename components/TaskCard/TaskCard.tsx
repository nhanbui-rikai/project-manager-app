import ProcessBar from "@/components/TaskCard/ProcessBar";
import { cn } from "@/lib/utils";
import { Typography } from "@mui/material";
import React from "react";

interface CardProps {
  task?: string;
  img?: string;
  desc?: string;
  status?: string;
  due_date?: string;
  member?: string;
  processing?: number;
  onClick?: () => void;
}

const TaskCard: React.FC<CardProps> = ({ task, img, desc, status, due_date, member, processing, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        aria-label="card-item-v1"
        className={cn("shadow-sm border rounded-md bg-white", "hover:shadow-md hover:cursor-pointer")}
      >
        <div className="relative flex-shrink-0 mb-2 h-32">
          <img src={img || "https://bit.ly/3zzCTUT"} alt="" className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col flex-1 p-2">
          <h3 className="mb-2 text-lg font-bold">{task}</h3>
          <Typography noWrap={true} className="text-secondary" variant="body2" gutterBottom>
            {desc}
          </Typography>
          <Typography noWrap={true} className="text-secondary" variant="body2" gutterBottom>
            {status}
          </Typography>
          <Typography noWrap={true} className="text-secondary" variant="body2" gutterBottom>
            Due date: {due_date}
          </Typography>
          <Typography noWrap={true} className="text-secondary" variant="body2" gutterBottom>
            Member: {member}
          </Typography>
          <div className="w-full text-end text-primary font-bold">{processing}%</div>
          <ProcessBar variant="determinate" value={processing || 0} />
        </div>
      </div>
    </>
  );
};

export default TaskCard;

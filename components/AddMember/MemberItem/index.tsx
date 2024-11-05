import { Close } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

export default function MemberItem({
  onClick,
  data,
  onRemove,
  disable = false,
}: {
  onClick?: (data: any) => void;
  onRemove?: (data: any) => void;
  data: any;
  disable?: boolean;
}) {
  const handleClick = () => {
    if (onClick && !disable) return onClick(data);
  };

  const handleRemove = () => {
    if (onRemove) return onRemove(data);
  };

  return (
    <div
      onClick={handleClick}
      className="py-1 pl-1 pr-2 flex items-center hover:bg-slate-200 cursor-pointer rounded-md relative"
    >
      <Avatar
        sx={{
          width: 30,
          height: 30,
          marginRight: 1,
        }}
      >
        N
      </Avatar>

      <div className="text-sm mr-2">{data?.userName}</div>
      {onRemove && (
        <button onClick={handleRemove} className="absolute right-2 top-[25%] flex items-center justify-start">
          <Close fontSize="small" />
        </button>
      )}
    </div>
  );
}

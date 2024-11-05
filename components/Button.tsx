import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes } from "react";
import RenderCondition from "./RederCondition";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: any;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<Props> = ({ name, className, loading = false, ...props }) => {
  return (
    <>
      <button className={cn("p-2 bg-light rounded-md text-white", className)} {...props}>
        <RenderCondition condition={!loading}>{name}</RenderCondition>
        <RenderCondition condition={loading}>{<RestartAltIcon className="animate-spin" />}</RenderCondition>
      </button>
    </>
  );
};

export default Button;

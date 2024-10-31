import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: any;
  className?: string;
}

const Button: React.FC<Props> = ({ name, className, ...props }) => {
  return (
    <button className={cn("p-2 bg-light rounded-md text-white", className)} {...props}>
      {name}
    </button>
  );
};

export default Button;

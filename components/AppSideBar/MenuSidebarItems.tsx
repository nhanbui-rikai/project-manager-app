"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PropType {
  className?: string;
  icon?: React.ReactNode;
  name?: string;
  path?: string;
}

const MenuSidebarItems: React.FC<PropType> = ({ className, icon, name, path }) => {
  const route = useRouter();

  const pathname = usePathname();
  const isActive = pathname === path;
  const handleOnClick = () => {
    route.push(path || "/");
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "h-full w-full gap-3 mb-3 p-3 rounded-md flex items-start justify-start",
        "hover:bg-slate-200/90 hover:cursor-pointer hover:text-black",
        !name && "items-center justify-center gap-0",
        isActive && "bg-slate-200/90 text-black",
        className,
      )}
    >
      {icon}
      <span>{name}</span>
    </div>
  );
};

export default MenuSidebarItems;

"use client";
import { useAppSelector } from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import React from "react";

export interface ExpandSideBarProps {
  children: React.ReactNode;
}

const ExpandSideBar: React.FC<ExpandSideBarProps> = ({ children }: { children: React.ReactNode }) => {
  const { isOpenOrClose } = useAppSelector((state) => state.app);
  return (
    <>
      <aside
        id="logo-sidebar"
        className={cn(
          "fixed top-0  bg-slate-50 shadow-md left-0 translate-x-0 z-40 w-full h-screen transition-transform duration-500 ease-in-out transform",
          isOpenOrClose ? "-translate-x-full" : "translate-x-0",
          "tablet:w-64",
        )}
        aria-label="Sidebar"
      >
        <div className="min-h-16 main-bg-color flex items-center justify-center p-4">
          <span className="text-white font-bold">Manager</span>
        </div>
        <div className={cn("h-full px-3 py-4 overflow-y-auto", "dark:bg-gray-800")}>{children}</div>
      </aside>
    </>
  );
};

export default ExpandSideBar;

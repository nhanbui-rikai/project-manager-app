"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { toggleOpenSideBar } from "@/lib/store/feature/app.slice";
import MenuIcon from "@mui/icons-material/Menu";
import { cn } from "@/lib/utils";
export interface ExpandSideBarProps {
  children: React.ReactNode;
}

const ExpandSideBar: React.FC<ExpandSideBarProps> = ({ children }: { children: React.ReactNode }) => {
  const { isOpenOrClose } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

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
        <div className="min-h-16 relative main-bg-color flex items-center justify-center p-4">
          <MenuIcon
            className="z-50 top-5 left-2 absolute text-white mobile:hidden"
            onClick={() => dispatch(toggleOpenSideBar())}
          ></MenuIcon>
          <span className="text-white font-bold">Manager</span>
        </div>
        <div className={cn("h-full px-3 py-4 overflow-y-auto", "dark:bg-gray-800")}>{children}</div>
      </aside>
    </>
  );
};

export default ExpandSideBar;

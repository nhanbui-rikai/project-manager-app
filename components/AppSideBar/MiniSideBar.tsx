"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useStore";

export interface MiniSideBarProps {
  children: React.ReactNode;
  className?: string;
}

const MiniSideBar: React.FC<MiniSideBarProps> = ({ children, className = "" }) => {
  const { isOpenOrClose } = useAppSelector((state) => state.app);
  return (
    <aside
      id="mini-sidebar"
      className={cn(
        "fixed top-0 h-full bg-slate-50 left-0 -translate-x-full z-40 w-16 transition-transform duration-500 ease-in-out transform",
        isOpenOrClose ? "mobile:translate-x-0" : "mobile:-translate-x-full",
        className,
      )}
      aria-label="Sidebar"
    >
      <div className={cn("overflow-y-auto bg-slate-100 w-full")}>
        <div className="brand flex justify-center items-center w-full">
          <div className="min-h-16 w-full text-white main-bg-color flex items-center justify-center p-4">M</div>
          {/* <Image
            onClick={() => {}}
            className="text-center cursor-pointer"
            src={brand}
            width={50}
            height={50}
            alt="Brand"
          /> */}
        </div>
        <div className="p-3">{children}</div>
      </div>
    </aside>
  );
};

export default MiniSideBar;

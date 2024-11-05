"use client";
import { useEffect, useState } from "react";
import ExpandSideBar from "@/components/AppSideBar/ExpandSideBar";
import MiniSideBar from "@/components/AppSideBar/MiniSideBar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useStore";
import MenuSidebarItems from "@/components/AppSideBar/MenuSidebarItems";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpenOrClose } = useAppSelector((state) => state.app);
  return (
    <main className="w-full h-full bg-slate-200/90">
      {/* Main content */}
      <ExpandSideBar>
        <div className="w-full">
          <MenuSidebarItems icon={<WorkIcon />} path="/project" name="Projects" />
          <MenuSidebarItems icon={<PersonIcon />} path="/user" name="User" />
          <MenuSidebarItems icon={<SettingsIcon />} path="/create_task" name="CreateTask" />
        </div>
      </ExpandSideBar>

      <MiniSideBar>
        <MenuSidebarItems icon={<WorkIcon />} path="/project" />
        <MenuSidebarItems icon={<PersonIcon />} path="/user" />
      </MiniSideBar>

      <div
        className={cn(
          "p-4 transition-all duration-500 ease-in-out",
          `${isOpenOrClose ? "mobile:ml-16" : "mobile:ml-64"}`,
        )}
      >
        <Header />
        <div className="bg-white mt-4 h-main p-4 rounded-md overflow-auto">{children}</div>
      </div>
    </main>
  );
};

export default LandingLayout;

"use client";
import ExpandSideBar from "@/components/AppSideBar/ExpandSideBar";
import MiniSideBar from "@/components/AppSideBar/MiniSideBar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import React from "react";
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
    <>
      <main className="absolute w-full h-full bg-slate-200/90">
        {/* Main content */}
        <ExpandSideBar>
          <div className="w-full">
            <MenuSidebarItems icon={<DashboardIcon />} path="/" name="Dashboard" />
            <MenuSidebarItems icon={<WorkIcon />} path="/project" name="Projects" />
            <MenuSidebarItems icon={<AssignmentIcon />} path="/task" name="Tasks" />
            <MenuSidebarItems icon={<PersonIcon />} path="/user" name="User" />
            <MenuSidebarItems icon={<SettingsIcon />} path="/setting" name="Settings" />
          </div>
        </ExpandSideBar>

        <MiniSideBar>
          <MenuSidebarItems icon={<DashboardIcon />} path="/" />
          <MenuSidebarItems icon={<WorkIcon />} path="/project" />
          <MenuSidebarItems icon={<AssignmentIcon />} path="/task" />
          <MenuSidebarItems icon={<PersonIcon />} path="/user" />
          <MenuSidebarItems icon={<SettingsIcon />} path="/setting" />
        </MiniSideBar>
        <div
          className={cn(
            "p-4 transition-all duration-500 ease-in-out",
            `${isOpenOrClose ? "mobile:ml-16" : "mobile:ml-64"}`,
          )}
        >
          <Header></Header>
          <div className="bg-slate-50 mt-4 h-main p-4 rounded-md">{children}</div>
        </div>
      </main>
    </>
  );
};

export default LandingLayout;

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
import { useTranslation } from "react-i18next";

interface TranslatedItems {
  dashboard: string;
  project: string;
  task: string;
  setting: string;
  user: string;
}

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpenOrClose } = useAppSelector((state) => state.app);
  const { t } = useTranslation();
  const [translatedItems, setTranslatedItems] = useState<TranslatedItems>({
    dashboard: "",
    project: "",
    task: "",
    setting: "",
    user: "",
  });

  useEffect(() => {
    setTranslatedItems({
      dashboard: t("app.sidebar.dashboard"),
      project: t("app.sidebar.project"),
      task: t("app.sidebar.task"),
      setting: t("app.sidebar.setting"),
      user: t("app.sidebar.user"),
    });
  }, [t]);

  return (
    <main className="absolute w-full h-full bg-slate-200/90">
      <ExpandSideBar>
        <div className="w-full">
          <MenuSidebarItems icon={<DashboardIcon />} path="/" name={translatedItems.dashboard} />
          <MenuSidebarItems icon={<WorkIcon />} path="/project" name={translatedItems.project} />
          <MenuSidebarItems icon={<AssignmentIcon />} path="/task" name={translatedItems.task} />
          <MenuSidebarItems icon={<PersonIcon />} path="/user" name={translatedItems.user} />
          <MenuSidebarItems icon={<SettingsIcon />} path="/setting" name={translatedItems.setting} />
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
        <Header />
        <div className="bg-slate-50 mt-4 h-main p-4 rounded-md overflow-auto">{children}</div>
      </div>
    </main>
  );
};

export default LandingLayout;

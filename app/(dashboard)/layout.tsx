"use client";
import ExpandSideBar from "@/components/AppSideBar/ExpandSideBar";
import MiniSideBar from "@/components/AppSideBar/MiniSideBar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useStore";
import MenuSidebarItems from "@/components/AppSideBar/MenuSidebarItems";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import RenderCondition from "@/components/RederCondition";
const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpenOrClose } = useAppSelector((state) => state.app);
  const { isAdmin } = useAppSelector((state) => state.auth);

  return (
    <main className="w-full h-screen bg-slate-200">
      <ExpandSideBar>
        <div className="w-full">
          <MenuSidebarItems icon={<WorkIcon />} path="/project" name="Projects" />
          <RenderCondition condition={isAdmin}>
            <MenuSidebarItems icon={<PeopleAltIcon />} path="/user" name="User" />
          </RenderCondition>
          <MenuSidebarItems icon={<PersonIcon />} path="/profile" name="Profile" />
          <MenuSidebarItems icon={<SettingsIcon />} path="/password" name="Settings" />
        </div>
      </ExpandSideBar>

      <MiniSideBar>
        <MenuSidebarItems icon={<WorkIcon />} path="/project" />
        <RenderCondition condition={isAdmin}>
          <MenuSidebarItems icon={<PeopleAltIcon />} path="/user" />
        </RenderCondition>
        <MenuSidebarItems icon={<PersonIcon />} path="/profile" />
        <MenuSidebarItems icon={<SettingsIcon />} path="/password" />
      </MiniSideBar>

      <div
        className={cn(
          "p-4 transition-all duration-500 ease-in-out",
          `${isOpenOrClose ? "mobile:ml-16" : "mobile:ml-64"}`,
        )}
      >
        <Header />
        <div className="bg-white mt-4 h-main max-w-main p-4 rounded-md overflow-auto">{children}</div>
      </div>
    </main>
  );
};

export default LandingLayout;

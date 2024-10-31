"use client";
import React from "react";
import { cn } from "@/lib/utils";
import MenuIcon from "@mui/icons-material/Menu";
import AccountSettingMenu from "@/components/AppSideBar/AccountSettingMenu";
import { useAppDispatch } from "@/hooks/useStore";
import { toggleOpenSideBar } from "@/lib/store/feature/app.slice";
import LanguageSwitcher from "./ChangeLanguage";
const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <header className={cn("min-h-12 p-2 shadow-md flex justify-between items-center bg-white rounded-md")}>
        <div className={cn("flex gap-3 items-center justify-between")}>
          <MenuIcon onClick={() => dispatch(toggleOpenSideBar())}></MenuIcon>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher></LanguageSwitcher>
          <AccountSettingMenu></AccountSettingMenu>
        </div>
      </header>
    </>
  );
};

export default Header;

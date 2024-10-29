"use client";
import React from "react";
import { cn } from "@/lib/utils";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountSettingMenu from "@/components/AppSideBar/AccountSettingMenu";
import { useAppDispatch } from "@/hooks/useStore";
import { toggleOpenSideBar } from "@/lib/store/feature/app.slice";
const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <header className={cn("min-h-12 p-2 shadow-md flex justify-between items-center bg-slate-50 rounded-md")}>
        <div className={cn("flex gap-3 items-center justify-between")}>
          <button onClick={() => dispatch(toggleOpenSideBar())}>
            <MenuIcon></MenuIcon>
          </button>
          <div className={cn("flex h-full items-center gap-3")}>
            {" "}
            <button>
              <SearchIcon />
            </button>
            <input
              type="text"
              className={cn("outline-none w-96 h-11 rounded-md p-3 border border-slate-200 bg-transparent")}
              placeholder="Search Input"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AccountSettingMenu></AccountSettingMenu>
        </div>
      </header>
    </>
  );
};

export default Header;

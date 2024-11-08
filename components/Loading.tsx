"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "@/hooks/useStore";
import LoadingSpinner from "./LoadingSpinner";
interface LoadingProps {
  children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ children }) => {
  const { loading } = useAppSelector((state) => state.app);

  return (
    <>
      <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <LoadingSpinner size={"8"} />
      </Backdrop>
      {children}
    </>
  );
};

export default Loading;

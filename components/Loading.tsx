"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "@/hooks/useStore";

export default function Loading() {
  const { loading } = useAppSelector((state) => state.app);

  return (
    <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

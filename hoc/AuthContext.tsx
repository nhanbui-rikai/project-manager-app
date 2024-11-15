"use client";
import { useAppDispatch } from "@/hooks/useStore";
import { updateUser } from "@/lib/store/feature/auth.slice";
import { getItems } from "@/lib/utils";
import React, { useEffect } from "react";

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = getItems("currentUser");
    if (user) dispatch(updateUser(user));
  }, []);

  return <>{children}</>;
};

export default AuthContext;

"use client";
import { useAppSelector } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLogin) router.push("/login");
  });
  const router = useRouter();
  return <>{children}</>;
};

export default AuthContext;

"use client";
import { useParams } from "next/navigation";
import React from "react";

const DetailUserPage = () => {
  const params = useParams<{ id: string }>();

  return <div></div>;
};

export default DetailUserPage;

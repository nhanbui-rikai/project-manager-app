"use client";
import { useParams } from "next/navigation";
import React from "react";

const DetailUserPage = () => {
  const params = useParams<{ id: string }>();
  return <div>detail user ${params.id}</div>;
};

export default DetailUserPage;

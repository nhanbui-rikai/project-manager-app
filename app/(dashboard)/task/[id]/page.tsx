"use client";
import { useParams } from "next/navigation";
import React from "react";

const DetailTaskPage = () => {
  const params = useParams();
  return <div>DetailTaskPage {params.id}</div>;
};

export default DetailTaskPage;

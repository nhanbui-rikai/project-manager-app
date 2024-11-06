"use client";
import TaskCard from "@/components/TaskCard/TaskCard";
import Search from "@/components/Search";
import { useAppSelector } from "@/hooks/useStore";
import { cn, formatDate } from "@/lib/utils";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const TaskPage = () => {
  const data: any[] = [];
  const [page, setPage] = React.useState(1);
  const [task, setTask] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const { isOpenOrClose } = useAppSelector((state) => state.app);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1  gap-2 mb-2 content-center justify-items-between",
          "mobile:grid-cols-2",
          "tablet:grid-cols-2",
          !isOpenOrClose && "tablet:grid-cols-1",
          !isOpenOrClose && "pc:grid-cols-2",
        )}
      >
        <Search></Search>

        <div
          className={cn(
            "flex items-center justify-center ",
            !isOpenOrClose && "tablet:justify-center",
            !isOpenOrClose && "pc:justify-end",
          )}
        >
          <Pagination count={3} page={page} onChange={handleChange} />
        </div>
      </div>
      <div
        className={cn(
          "grid grid-cols-1 gap-5 mt-5 duration-100 transition-all",
          "mobile:grid-cols-2",
          "tablet:grid-cols-2",
          !isOpenOrClose && "tablet:grid-cols-1",
          "pc:grid-cols-3",
          !isOpenOrClose && "pc:grid-cols-2",
        )}
      >
        {data &&
          data.map((items, index) => (
            <TaskCard
              onClick={() => router.push(`/task/${items.id}`)}
              key={items.id}
              desc={items.description}
              processing={items.processing || 0}
              member={items.assigned_to}
              status={items.status}
              task={items.title}
              due_date={formatDate(items.due_date, "string")}
            />
          ))}
      </div>
    </>
  );
};

export default TaskPage;

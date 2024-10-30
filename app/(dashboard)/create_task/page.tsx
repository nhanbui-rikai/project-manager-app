"use client";
import CreateTaskPopup from "@/components/CreateTask";
import { Button } from "@mui/material";
import React, { useState } from "react";

export default function CreateTask() {
  const [createPopup, setCreatePopup] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setCreatePopup(true)} variant="contained">
        Create
      </Button>

      <CreateTaskPopup
        open={createPopup}
        onClose={(value) => {
          setCreatePopup(value);
        }}
      />
    </div>
  );
}

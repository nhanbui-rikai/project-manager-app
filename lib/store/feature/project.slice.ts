"use client";

import { IProject, ITask } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProjectProps {
  projectData: IProject[] | null;
  currentProjectData: IProject | null;
  currentTask: ITask | null;
}

const initialState: ProjectProps = {
  projectData: null,
  currentProjectData: null,
  currentTask: null,
};

export const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProjectData: (state, action: PayloadAction<any>) => {
      state.currentProjectData = action.payload;
    },
    setProjectData: (state, action: PayloadAction<any>) => {
      state.projectData = action.payload;
    },

    setCurrentTask: (state, action: PayloadAction<any>) => {
      state.currentTask = action.payload;
    },
  },
});

export const { setCurrentProjectData, setProjectData } = ProjectSlice.actions;
export default ProjectSlice.reducer;

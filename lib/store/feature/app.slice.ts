"use client";

import i18n from "@/lib/i18n/i18n";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isOpenOrClose: boolean;
  language: string;
}

const initialState: AppState = {
  isOpenOrClose: false,
  language: "en",
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleOpenSideBar: (state) => {
      state.isOpenOrClose = !state.isOpenOrClose;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { toggleOpenSideBar, setLanguage } = AppSlice.actions;
export default AppSlice.reducer;

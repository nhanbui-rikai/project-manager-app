"use client";

import i18n from "@/lib/i18n/i18n";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isOpenOrClose: boolean;
  language: string;
  loading: boolean;
  selectedUser: any;
}

const initialState: AppState = {
  isOpenOrClose: false,
  language: "en",
  loading: false,
  selectedUser: [],
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

    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setSelectedUser: (state, action: PayloadAction<any>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { toggleOpenSideBar, setLanguage, setSelectedUser, setAppLoading } = AppSlice.actions;
export default AppSlice.reducer;

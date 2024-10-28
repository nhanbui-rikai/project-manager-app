"use client"

import { createSlice } from "@reduxjs/toolkit"

export interface AppState {
  isOpenOrClose: boolean
}

const initialState: AppState = {
  isOpenOrClose: false
}

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleOpenSideBar: (state) => {
      state.isOpenOrClose = !state.isOpenOrClose
    }
  }
})

export const { toggleOpenSideBar } = AppSlice.actions
export default AppSlice.reducer

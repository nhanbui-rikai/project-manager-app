"use client"

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
  isLogin: boolean
  currentUser: any
  loading: boolean
  err: Error | null
}
// Login google
export const loginUser = createAsyncThunk(
  "auth/login",
  // if you type your function argument here
  async (data, thunkAPI) => {
    try {
      //   const response = await signInWithPopup(authOptions, provider)
      //   const user: UserInfo = response.user

      //   if (!user) return null
      //   const payload = {
      //     uid: user.uid,
      //     email: user.email,
      //     displayName: user.displayName,
      //     photoURL: user.photoURL
      //   }
      return null
    } catch (error: unknown) {
      return error instanceof Error ? thunkAPI.rejectWithValue(error.message) : thunkAPI.rejectWithValue("Login error")
    }
  }
)
// Logout
export const logOut = createAsyncThunk("auth/logout", async (data, thunkAPI) => {
  try {
    // const response = await signOut(auth)
    return null
  } catch (error) {
    return error instanceof Error ? thunkAPI.rejectWithValue(error.message) : thunkAPI.rejectWithValue("Logout error")
  }
})

const initialState: AuthState = {
  isLogin: false,
  currentUser: null,
  loading: false,
  err: null
}

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<any>) => {
      state.isLogin = true
      state.currentUser = action.payload
    },

    login: () => {},

    register: () => {}
  },
  extraReducers: (builder) => {
    builder
      // Login google
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLogin = true
        state.loading = false
      })

      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.err = action.payload
        state.loading = false
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      // Logout
      .addCase(logOut.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLogin = false
        state.loading = false
        state.currentUser = null
      })

      .addCase(logOut.rejected, (state, action: PayloadAction<any>) => {
        state.err = action.payload
        state.loading = false
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true
      })
  }
})

export const { updateUser, login, register } = AuthSlice.actions
export default AuthSlice.reducer

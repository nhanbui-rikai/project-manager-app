import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const loginUser = createAsyncThunk(
  "auth/login",
  // if you type your function argument here
  async (data, thunkAPI) => {
    try {
      // const response = await signInWithPopup(authOptions, provider)

      //   if (!user) return null;
      const payload = {};
      return payload;
    } catch (error) {
      return error ? thunkAPI.rejectWithValue(error.message) : thunkAPI.rejectWithValue("Login error");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    isLogin: false,
    user: null,
  },
  reducer: (state, action) => {},

  extraReducers: (build) =>
    build
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogin = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      }),
});

export { loginUser };

export default authSlice.reducer;

const { createSlice } = require("@reduxjs/toolkit");

const appSlice = createSlice({
  name: "app",
  initialState: {
    collapse: false,
    loading: false,
    error: null,
  },
  reducers: {
    toggleCollapse: (state) => {
      state.collapse = !state.collapse;
    },
  },
});

export const { toggleCollapse } = appSlice.actions; // Export the action
export default appSlice.reducer; // Export the reducer as default

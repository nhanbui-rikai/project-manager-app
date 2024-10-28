const { configureStore } = require("@reduxjs/toolkit");
import appSlice from "./feature/app.slice";
import authSlice from "./feature/auth.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appSlice,
      auth: authSlice,
    },
  });
};

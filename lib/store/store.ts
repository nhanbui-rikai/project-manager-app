import { configureStore } from "@reduxjs/toolkit"
import { AppSlice } from "./feature/app.slice"
import { AuthSlice } from "./feature/auth.slice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: AppSlice.reducer,
      auth: AuthSlice.reducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

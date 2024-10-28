import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch, AppStore } from "@/lib/store/store"

// Use throughout your app instead of plain `useDispatch`, `useSelector`, and `useStore`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore = () => useStore<AppStore>()

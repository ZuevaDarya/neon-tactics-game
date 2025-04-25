import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { TPreloadedState } from "../types/services-types";
import rootReducer from "./root-reducer";

const preloadedState: TPreloadedState = {
  gameField: {
    field: [],
    targetCard: null,
  },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { TPreloadedState } from "../types/services-types";
import { createSocketMiddleware } from "./middlewares/socket-middleware";
import rootReducer from "./root-reducer";

const preloadedState: TPreloadedState = {
  game: {
    field: [],
    targetCard: null,
    countTurn: 0,
    winnerId: null,
    error: null,
    endType: null,
    isSuccess: false,
    isRequest: false,
    animatePieceIdx: null,
    isHintOn: false,
  },
  players: {
    creator: null,
    player: null,
    isRequest: false,
    isSuccess: false,
    error: null,
  },
  room: {
    id: null,
    creatorId: null,
    playerId: null,
    status: null,
    isRequest: false,
    isSuccess: false,
    error: null,
  },
  socket: {
    isConnected: false,
    error: null,
    socketId: null,
  },
};

const socketMiddleware = createSocketMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(socketMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

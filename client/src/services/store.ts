import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { TPreloadedState } from "../types/services-types";
import { createSocketMiddleware } from "./middlewares/socket-middleware";
import rootReducer from "./root-reducer";

const preloadedState: TPreloadedState = {
  gameField: {
    field: [],
    targetCard: null,
  },
  gameState: {
    countTurn: 0,
    activePlayer: null,
    winner: null,
  },
  players: {
    creator: null,
    player: null,
    isRequest: false,
    isSuccess: false,
  },
  room: {
    roomId: null,
    creatorId: null,
    playerId: null,
    status: null,
    isRequest: false,
    isSuccess: false,
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

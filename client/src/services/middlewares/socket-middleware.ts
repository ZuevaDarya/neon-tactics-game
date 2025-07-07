import { Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { SocketEvent } from "../../constants/socket-event";
import { SessionStorageKey } from "../../constants/storage-keys";
import { TCreateFieldResponse, TPlayerWithRoomResponse } from "../../types/services-types";
import { updateGameFieldState } from "../slices/game-field-slice";
import { setPlayersState } from "../slices/players-slice";
import { setRoomState } from "../slices/room-slice";
import { connect, connected, disconnected, getError, startGame } from "../slices/socket-slice";
import { RootState } from "../store";

export function createSocketMiddleware(): Middleware<unknown, RootState> {
  let socket: Socket | null = null;

  return (({ dispatch }) =>
    (next) =>
    (action) => {
      if (connect.match(action)) {
        const { url } = action.payload;

        if (socket?.connected) {
          console.warn("WebSocket is already connected");
          return next(action);
        }

        if (socket) {
          socket.disconnect();
        }

        socket = io(url, {
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socket.on(SocketEvent.Connect, () => {
          console.log("Socket connected");

          const socketId = socket?.id || "";
          sessionStorage.setItem(SessionStorageKey.SocketId, socketId);
          dispatch(connected({ socketId }));
        });

        socket.on(SocketEvent.Disconnect, () => {
          sessionStorage.removeItem(SessionStorageKey.SocketId);
          console.log("Socket disconnected");

          sessionStorage.removeItem(SessionStorageKey.SocketId);
          dispatch(disconnected());
        });

        socket.on(SocketEvent.Error, (error: Error) => {
          console.error("Socket error:", error.message);
          dispatch(getError({ error: error.message }));
        });

        socket.on(SocketEvent.JoinRoom, (data: TPlayerWithRoomResponse) => {
          console.log(`Player: ${data.player.name} join in room`);
          dispatch(setRoomState(data));
          dispatch(setPlayersState(data));
        });

        socket.on(SocketEvent.CreateRoom, (data: TPlayerWithRoomResponse) => {
          console.log(`Set players`);
          dispatch(setPlayersState(data));
          dispatch(setRoomState(data));
        });

        socket.on(SocketEvent.Redirect, (data: { url: string }) => {
          window.history.pushState({}, "", data.url);
          window.dispatchEvent(new PopStateEvent("popstate"));
          console.log("Redirect players");
        });

        socket.on(SocketEvent.CreateGameField, (data: TCreateFieldResponse) => {
          console.log("Get shuffled field");
          dispatch(updateGameFieldState(data));
        });
      }

      if (startGame.match(action)) {
        if (!socket?.connected) {
          console.warn("Socket is not connected");
          return next(action);
        }

        const { roomId, url } = action.payload;
        socket.emit(SocketEvent.StartGame, { roomId, url });
        console.log("Start game");
      }

      return next(action);
    }) as Middleware;
}

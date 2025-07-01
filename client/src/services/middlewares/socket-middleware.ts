import { Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { SocketEvent } from "../../constants/socket-event";
import { SessionStorageKey } from "../../constants/storage-keys";
import { TPlayerWithRoomResponse } from "../../types/services-types";
import { setPlayersState } from "../slices/players-slice";
import { setRoomState } from "../slices/room-slice";
import { connect, connected, disconnected, getError } from "../slices/socket-slice";
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
      }

      return next(action);
    }) as Middleware;
}

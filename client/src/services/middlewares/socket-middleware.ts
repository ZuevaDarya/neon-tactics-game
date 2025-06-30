import { Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { SocketEvent } from "../../constants/socket-event";
import { SessionStorageKey } from "../../constants/storage-keys";
import { connect, connected, disconnected, getError } from "../slices/socket-slice";
import { RootState } from "../store";

export function createSocketMiddleware(): Middleware<{}, RootState> {
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
      }

      return next(action);
    }) as Middleware;
}

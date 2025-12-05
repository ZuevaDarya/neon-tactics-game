import { Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { SocketEvent } from "../../constants/socket-event";
import { StorageKey } from "../../constants/storage-keys";
import {
  TAnimatePieceResponse,
  TAssignWinnerResponse,
  TCreateGameResponse,
  TMakeMoveResponse,
  TPlayAgainResponse,
  TPlayer,
  TPlayerWithRoomResponse,
  TResetGameResponse,
  TStartGameResponse,
  TUpdateGameResponse,
} from "../../types/services-types";
import { resetGameState, updateAnimatePieceIdx, updateGameState } from "../slices/game-slice";
import { resetPlayersState, setPlayer } from "../slices/players-slice";
import { resetRoomState, updateRoomState } from "../slices/room-slice";
import {
  connect,
  connected,
  disconnected,
  getError,
  makeRandomMove,
  redirectPlayers,
} from "../slices/socket-slice";
import { RootState } from "../store";

export function createSocketMiddleware(): Middleware<unknown, RootState> {
  let socket: Socket | null = null;
  const roomId = sessionStorage.getItem(StorageKey.RoomId);

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
          auth: {
            token: sessionStorage.getItem(StorageKey.SocketId),
            roomId,
          },
        });

        socket.on(SocketEvent.Connect, () => {
          console.log("Socket connected");

          const socketId = socket?.id || "";
          sessionStorage.setItem(StorageKey.SocketId, socketId);
          dispatch(connected({ socketId }));
        });

        socket.on(SocketEvent.SyncState, () => {
          console.log("Sync state");
        });

        socket.on(SocketEvent.PlayerReconnected, () => {
          console.log("Player reconnected");
        });

        socket.on(SocketEvent.Disconnect, () => {
          console.log("Socket disconnected");

          sessionStorage.removeItem(StorageKey.SocketId);
          dispatch(disconnected());
        });

        socket.on(SocketEvent.Error, (error: Error) => {
          console.error("Socket error:", error.message);
          dispatch(getError({ error: error.message }));
        });

        socket.on(SocketEvent.JoinRoom, (data: TPlayerWithRoomResponse) => {
          console.log(`Player: ${data.player.name} join in room`);
          dispatch(updateRoomState(data.room));
          dispatch(setPlayer(data.player));
        });

        socket.on(SocketEvent.CreateRoom, (data: TPlayerWithRoomResponse) => {
          console.log(`Set player and create room`);
          dispatch(setPlayer(data.player));
          dispatch(updateRoomState(data.room));
        });

        socket.on(SocketEvent.Redirect, (data: { url: string }) => {
          window.history.pushState({}, "", data.url);
          window.dispatchEvent(new PopStateEvent("popstate"));
          console.log("Redirect players");
        });

        socket.on(SocketEvent.CreateGame, (data: TCreateGameResponse) => {
          console.log("Create game");
          dispatch(updateGameState(data));
        });

        socket.on(SocketEvent.AssignPieceType, (data: TPlayer[]) => {
          console.log("Assign piece type");
          data.forEach((player) => dispatch(setPlayer(player)));
        });

        socket.on(SocketEvent.SelectActivePlayer, (data: TPlayer) => {
          console.log("Set active player");
          dispatch(setPlayer(data));
        });

        socket.on(SocketEvent.UpdateGame, (data: TUpdateGameResponse) => {
          console.log("Update game");
          dispatch(updateGameState(data));
        });

        socket.on(SocketEvent.IncrementCountTurn, (data: TUpdateGameResponse) => {
          console.log("Increment count turn");
          dispatch(updateGameState(data));
        });

        socket.on(SocketEvent.ChangeActiveStatus, (data: TPlayer) => {
          console.log("Change active status");
          dispatch(setPlayer(data));
        });

        socket.on(SocketEvent.DecrementPieceCount, (data: TPlayer) => {
          console.log("decrement piece count");
          dispatch(setPlayer(data));
        });

        socket.on(SocketEvent.SetActivePlayer, (data: TPlayer[]) => {
          console.log("set active player");
          data.forEach((player) => dispatch(setPlayer(player)));
        });

        socket.on(SocketEvent.ResetGame, (data: TResetGameResponse) => {
          console.log("Reset game");
          data.players.forEach((player) => dispatch(setPlayer(player)));
          dispatch(updateGameState(data.game));
          dispatch(updateRoomState(data.room));
        });

        socket.on(SocketEvent.ShuffleField, (data: TCreateGameResponse) => {
          console.log("Shuffle field");
          dispatch(updateGameState(data));
        });

        socket.on(SocketEvent.LeaveRoom, () => {
          console.log("Leaved room");
          dispatch(resetPlayersState());
          dispatch(resetRoomState());
          dispatch(resetGameState());
        });

        socket.on(SocketEvent.MakeMove, (data: TMakeMoveResponse) => {
          console.log("Make move");

          dispatch(updateGameState(data.game));

          if ("room" in data) {
            dispatch(updateRoomState(data.room));
          }

          if ("players" in data) {
            data.players.map((player) => dispatch(setPlayer(player)));
          }
        });

        socket.on(SocketEvent.StartGame, (data: TStartGameResponse) => {
          console.log("Start game");
          data.players.forEach((player) => dispatch(setPlayer(player)));
          dispatch(updateGameState(data.game));
          dispatch(updateRoomState(data.room));
        });

        socket.on(SocketEvent.PlayAgain, (data: TPlayAgainResponse) => {
          console.log("Play Again");
          data.players.forEach((player) => dispatch(setPlayer(player)));
          dispatch(updateGameState(data.game));
          sessionStorage.setItem(StorageKey.HasAnimationPlayed, String(false));
          sessionStorage.setItem(StorageKey.IsWinnerModalOpen, String(false));
        });

        socket.on(SocketEvent.AssignWinner, (data: TAssignWinnerResponse) => {
          console.log("Give up");
          dispatch(updateGameState(data.game));
        });

        socket.on(SocketEvent.AnimatePiece, (data: TAnimatePieceResponse) => {
          console.log("Animate piece");
          dispatch(updateAnimatePieceIdx(data.pieceIdx));
        });

        socket.on(SocketEvent.MakeRandomMove, (data: TMakeMoveResponse) => {
          console.log("Make random move");

          dispatch(updateGameState(data.game));

          if ("room" in data) {
            dispatch(updateRoomState(data.room));
          }

          if ("players" in data) {
            data.players.map((player) => dispatch(setPlayer(player)));
          }
        });
      }

      if (redirectPlayers.match(action)) {
        if (!socket?.connected) {
          console.warn("Socket is not connected");
          return next(action);
        }

        const { roomId, url } = action.payload;
        socket.emit(SocketEvent.RedirectPlayers, { roomId, url });
        console.log("Redirect players");
      }

      if (makeRandomMove.match(action)) {
        if (!socket?.connected) {
          console.warn("Socket is not connected");
          return next(action);
        }

        const { roomId, data } = action.payload;
        socket.emit(SocketEvent.EndedTimeToTurn, { roomId, data });
        console.log("Ended time to turn");
      }

      return next(action);
    }) as Middleware;
}

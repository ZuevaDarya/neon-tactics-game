import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { StorageKey } from "../../constants/storage-keys";
import { TRoomBase, TRoomState } from "../../types/services-types";
import {
  createPlayerWithCreateRoom,
  createPlayerWithJoinInRoom,
  createRoom,
  deleteRoom,
  getRoom,
  leaveGame,
  makePlayerMove,
  resetGame,
  startGame,
  updateRoomStatus,
} from "../thunks";

const initialState: TRoomState = {
  id: null,
  creatorId: null,
  playerId: null,
  status: null,
  isRequest: false,
  isSuccess: false,
  error: null,
};

const roomSlice = createSlice({
  name: SliceNamespace.Room,
  initialState,
  reducers: {
    updateRoomState: (state, { payload }: PayloadAction<TRoomBase>) => {
      state.playerId = payload.playerId;
      state.creatorId = payload.creatorId;
      state.id = payload.id;
      state.status = payload.status;
      sessionStorage.setItem(StorageKey.RoomId, payload.id);
    },
    resetRoomState: (state) => {
      state.id = null;
      state.creatorId = null;
      state.playerId = null;
      state.status = null;
      state.isRequest = false;
      state.isSuccess = false;
      state.error = null;
      sessionStorage.removeItem(StorageKey.RoomId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(createRoom.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(createRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.id = payload.id;
        state.creatorId = payload.creatorId;
        state.playerId = payload.playerId;
        state.status = payload.status;
        sessionStorage.setItem(StorageKey.RoomId, payload.id);
      })
      .addCase(createPlayerWithCreateRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(createPlayerWithCreateRoom.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(createPlayerWithCreateRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.id = payload.room.id;
        state.creatorId = payload.room.creatorId;
        state.playerId = payload.room.playerId;
        state.status = payload.room.status;
        sessionStorage.setItem(StorageKey.RoomId, payload.room.id);
      })
      .addCase(getRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(getRoom.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(getRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.id = payload.id;
        state.creatorId = payload.creatorId;
        state.playerId = payload.playerId;
        state.status = payload.status;
        sessionStorage.setItem(StorageKey.RoomId, payload.id);
      })
      .addCase(createPlayerWithJoinInRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(createPlayerWithJoinInRoom.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(createPlayerWithJoinInRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.playerId = payload.room.playerId;
        state.creatorId = payload.room.creatorId;
        state.id = payload.room.id;
        state.status = payload.room.status;
        sessionStorage.setItem(StorageKey.RoomId, payload.room.id);
      })
      .addCase(deleteRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(deleteRoom.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(deleteRoom.fulfilled, (state) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.playerId = null;
        state.id = null;
        state.creatorId = null;
        state.status = null;
        sessionStorage.removeItem(StorageKey.RoomId);
      })
      .addCase(updateRoomStatus.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateRoomStatus.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(updateRoomStatus.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.status = payload.status;
      })
      .addCase(resetGame.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(resetGame.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(resetGame.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.creatorId = payload.room.creatorId;
        state.playerId = payload.room.playerId;
        state.status = payload.room.status;
      })
      .addCase(leaveGame.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(leaveGame.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(leaveGame.fulfilled, (state) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.playerId = null;
        state.id = null;
        state.creatorId = null;
        state.status = null;
        sessionStorage.removeItem(StorageKey.RoomId);
      })
      .addCase(makePlayerMove.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(makePlayerMove.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(makePlayerMove.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;

        if ("room" in payload) {
          state.playerId = payload.room.playerId;
          state.creatorId = payload.room.creatorId;
          state.id = payload.room.id;
          state.status = payload.room.status;
          sessionStorage.setItem(StorageKey.RoomId, payload.room.id);
        }
      })
      .addCase(startGame.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(startGame.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(startGame.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.id = payload.room.id;
        state.creatorId = payload.room.creatorId;
        state.playerId = payload.room.playerId;
        state.status = payload.room.status;
        sessionStorage.setItem(StorageKey.RoomId, payload.room.id);
      });
  },
});

export const { updateRoomState, resetRoomState } = roomSlice.actions;
export default roomSlice.reducer;

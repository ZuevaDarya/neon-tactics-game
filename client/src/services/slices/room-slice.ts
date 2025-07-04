import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { SessionStorageKey } from "../../constants/storage-keys";
import { TPlayerWithRoomResponse, TRoomState } from "../../types/services-types";
import {
  createPlayerWithCreateRoom,
  createPlayerWithJoinInRoom,
  createRoom,
  deleteRoom,
  getRoom,
  updateRoomStatus,
} from "../thunks";

const initialState: TRoomState = {
  roomId: null,
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
    setRoomState: (state, { payload }: PayloadAction<TPlayerWithRoomResponse>) => {
      state.playerId = payload.room.playerId;
      state.creatorId = payload.room.creatorId;
      state.roomId = payload.room.roomId;
      state.status = payload.room.status;
      sessionStorage.setItem(SessionStorageKey.RoomId, payload.room.roomId);
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
        state.roomId = payload.roomId;
        state.creatorId = payload.creatorId;
        state.playerId = payload.playerId;
        state.status = payload.status;
        sessionStorage.setItem(SessionStorageKey.RoomId, payload.roomId);
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
        state.roomId = payload.room.roomId;
        state.creatorId = payload.room.creatorId;
        state.playerId = payload.room.playerId;
        state.status = payload.room.status;
        sessionStorage.setItem(SessionStorageKey.RoomId, payload.room.roomId);
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
        state.roomId = payload.roomId;
        state.creatorId = payload.creatorId;
        state.playerId = payload.playerId;
        state.status = payload.status;
        sessionStorage.setItem(SessionStorageKey.RoomId, payload.roomId);
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
        state.roomId = payload.room.roomId;
        state.status = payload.room.status;
        sessionStorage.setItem(SessionStorageKey.RoomId, payload.room.roomId);
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
        state.roomId = null;
        state.creatorId = null;
        state.status = null;
        sessionStorage.removeItem(SessionStorageKey.RoomId);
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
      });
  },
});

export const { setRoomState } = roomSlice.actions;
export default roomSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TPlayerWithRoomResponse, TRoomState } from "../../types/services-types";
import {
  createPlayerWithCreateRoom,
  createPlayerWithJoinInRoom,
  createRoom,
  deleteRoom,
  getRoom,
} from "../thunks";

const initialState: TRoomState = {
  roomId: null,
  creatorId: null,
  playerId: null,
  status: null,
  isRequest: false,
  isSuccess: false,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(createRoom.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(createRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.roomId = payload.roomId;
        state.creatorId = payload.creatorId;
        state.playerId = payload.playerId;
        state.status = payload.status;
      })
      .addCase(createPlayerWithCreateRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(createPlayerWithCreateRoom.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(createPlayerWithCreateRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.roomId = payload.room.roomId;
        state.creatorId = payload.room.creatorId;
        state.playerId = payload.room.playerId;
        state.status = payload.room.status;
      })
      .addCase(getRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(getRoom.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(getRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.roomId = payload.roomId;
        state.creatorId = payload.creatorId;
        state.playerId = payload.playerId;
        state.status = payload.status;
      })
      .addCase(createPlayerWithJoinInRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(createPlayerWithJoinInRoom.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(createPlayerWithJoinInRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.playerId = payload.room.playerId;
        state.creatorId = payload.room.creatorId;
        state.roomId = payload.room.roomId;
        state.status = payload.room.status;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(deleteRoom.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(deleteRoom.fulfilled, (state) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.playerId = null;
        state.roomId = null;
        state.creatorId = null;
        state.status = null;
      });
  },
});

export const { setRoomState } = roomSlice.actions;
export default roomSlice.reducer;

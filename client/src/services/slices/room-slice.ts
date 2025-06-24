import { createSlice } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TRoomState } from "../../types/services-types";
import { addPlayerWithCreateRoom, addPlayerWithJoinInRoom, createRoom, deleteRoom, getRoom } from "../thunks";

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
  reducers: {},
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
      .addCase(addPlayerWithCreateRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(addPlayerWithCreateRoom.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(addPlayerWithCreateRoom.fulfilled, (state, { payload }) => {
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
      .addCase(addPlayerWithJoinInRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(addPlayerWithJoinInRoom.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(addPlayerWithJoinInRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.playerId = payload.room.playerId;
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

export default roomSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TPlayersState } from "../../types/services-types";
import {
  createPlayer,
  createPlayerWithCreateRoom,
  createPlayerWithJoinInRoom,
  getPlayer,
} from "../thunks";

const initialState: TPlayersState = {
  creator: null,
  player: null,
  isRequest: false,
  isSuccess: false,
};

const playersSlice = createSlice({
  name: SliceNamespace.Players,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlayer.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(createPlayer.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(createPlayer.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.player = payload;
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
        state.creator = payload.player;
      })
      .addCase(getPlayer.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(getPlayer.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(getPlayer.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.creator = payload;
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
        state.player = payload.player;
      });
  },
});

export default playersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TPlayersState } from "../../types/services-types";
import { addPlayer, addPlayerWithRoom, getPlayer } from "../thunks";

const initialState: TPlayersState = {
  creator: null,
  player: null,
  isRequest: false,
  isSuccess: false,
};

const playersSlice = createSlice({
  name: SliceNamespace.Players,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPlayer.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(addPlayer.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(addPlayer.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.player = payload;
      })
      .addCase(addPlayerWithRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(addPlayerWithRoom.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(addPlayerWithRoom.fulfilled, (state, { payload }) => {
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
      });
  },
});

export default playersSlice.reducer;

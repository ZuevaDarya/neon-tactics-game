import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TPlayersState, TPlayerWithRoomResponse } from "../../types/services-types";
import {
  createPlayer,
  createPlayerWithCreateRoom,
  createPlayerWithJoinInRoom,
  getAllPlayersInRoom,
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
  reducers: {
    setPlayersState: (state, { payload }: PayloadAction<TPlayerWithRoomResponse>) => {
      if (payload.player.isCreator) {
        state.creator = payload.player;
      } else {
        state.player = payload.player;
      }
    },
  },
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
      })
      .addCase(getAllPlayersInRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
      })
      .addCase(getAllPlayersInRoom.rejected, (state) => {
        state.isRequest = false;
        state.isSuccess = false;
      })
      .addCase(getAllPlayersInRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;

        payload.players.forEach(player => {
          if (player.isCreator) {
            state.creator = player;
          }
          state.player = player;
        });

      });
  },
});

export const { setPlayersState } = playersSlice.actions;
export default playersSlice.reducer;

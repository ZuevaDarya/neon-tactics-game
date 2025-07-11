import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TPlayersState, TSelectActivePlayerResponse } from "../../types/services-types";
import {
  assignRandomPieceType,
  createPlayer,
  createPlayerWithCreateRoom,
  createPlayerWithJoinInRoom,
  deletePlayer,
  getAllPlayersInRoom,
  getPlayer,
  selectActivePlayer,
} from "../thunks";

const initialState: TPlayersState = {
  creator: null,
  player: null,
  isRequest: false,
  isSuccess: false,
  error: null,
};

const playersSlice = createSlice({
  name: SliceNamespace.Players,
  initialState,
  reducers: {
    setPlayer: (state, { payload }: PayloadAction<TSelectActivePlayerResponse>) => {
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
        state.error = null;
      })
      .addCase(createPlayer.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(createPlayer.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.player = payload;
        state.error = null;
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
        state.creator = payload.player;
        state.error = null;
      })
      .addCase(getPlayer.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(getPlayer.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(getPlayer.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.creator = payload;
        state.error = null;
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
        state.player = payload.player;
        state.error = null;
      })
      .addCase(getAllPlayersInRoom.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(getAllPlayersInRoom.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(getAllPlayersInRoom.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;

        payload.players.forEach((player) => {
          if (player.isCreator) {
            state.creator = player;
          }
          state.player = player;
        });
      })
      .addCase(deletePlayer.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(deletePlayer.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(deletePlayer.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;

        if (payload.isCreator) {
          state.creator = null;
        } else {
          state.player = null;
        }
      })
      .addCase(assignRandomPieceType.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(assignRandomPieceType.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(assignRandomPieceType.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;

        payload.forEach((player) => {
          if (player.isCreator) {
            state.creator = player;
          }
          state.player = player;
        });
      })
      .addCase(selectActivePlayer.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(selectActivePlayer.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(selectActivePlayer.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;

        if (payload.player.isCreator) {
          state.creator = payload.player;
        } else {
          state.player = payload.player;
        }
      });
  },
});

export const { setPlayer } = playersSlice.actions;
export default playersSlice.reducer;

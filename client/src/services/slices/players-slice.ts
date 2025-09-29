import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { SessionStorageKey } from "../../constants/storage-keys";
import { TPlayer, TPlayersState } from "../../types/services-types";
import {
  assignRandomPieceType,
  changeActiveStatus,
  createPlayer,
  createPlayerWithCreateRoom,
  createPlayerWithJoinInRoom,
  decrementPieceCount,
  deletePlayer,
  getAllPlayersInRoom,
  getPlayer,
  leaveGame,
  makePlayerMove,
  resetGame,
  selectActivePlayer,
  setActivePlayer,
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
    setPlayer: (state, { payload }: PayloadAction<TPlayer>) => {
      if (payload.isCreator) {
        state.creator = payload;
      } else {
        state.player = payload;
      }
    },
    resetPlayersState: (state) => {
      state.creator = null;
      state.player = null;
      state.isRequest = false;
      state.isSuccess = false;
      state.error = null;
      sessionStorage.removeItem(SessionStorageKey.PlayerId);
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
        sessionStorage.setItem(SessionStorageKey.PlayerId, payload.id);
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
        sessionStorage.setItem(SessionStorageKey.PlayerId, payload.player.id);
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
        sessionStorage.setItem(SessionStorageKey.PlayerId, payload.player.id);
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

        payload.forEach((player) => {
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
        sessionStorage.removeItem(SessionStorageKey.PlayerId);
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

        if (payload.isCreator) {
          state.creator = payload;
        } else {
          state.player = payload;
        }
      })
      .addCase(decrementPieceCount.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(decrementPieceCount.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(decrementPieceCount.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;

        if (payload.isCreator) {
          state.creator = payload;
        } else {
          state.player = payload;
        }
      })
      .addCase(changeActiveStatus.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(changeActiveStatus.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(changeActiveStatus.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;

        if (payload.isCreator) {
          state.creator = payload;
        } else {
          state.player = payload;
        }
      })
      .addCase(setActivePlayer.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(setActivePlayer.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(setActivePlayer.fulfilled, (state, { payload }) => {
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

        payload.players.forEach((player) => {
          if (player.isCreator) {
            state.creator = player;
          }
          state.player = player;
        });
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
        state.creator = null;
        state.player = null;
        sessionStorage.removeItem(SessionStorageKey.PlayerId);
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

        if ("players" in payload) {
          payload.players.forEach((player) => {
            if (player.isCreator) {
              state.creator = player;
            }
            state.player = player;
          });
        }
      });
  },
});

export const { setPlayer, resetPlayersState } = playersSlice.actions;
export default playersSlice.reducer;

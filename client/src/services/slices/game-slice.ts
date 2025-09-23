import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TCreateGameResponse, TGameState } from "../../types/services-types";
import {
  createGame,
  deleteGame,
  getGame,
  incrementCountTurn,
  leaveGame,
  resetGame,
  shuffleField,
  updateFieldElement,
  updateGame,
} from "../thunks";

export const initialState: TGameState = {
  field: [],
  targetCard: null,
  countTurn: 0,
  winnerId: null,
  error: null,
  isRequest: false,
  isSuccess: false,
};

const gameFieldSlice = createSlice({
  name: SliceNamespace.Game,
  initialState,
  reducers: {
    updateGameState: (state, { payload }: PayloadAction<TCreateGameResponse>) => {
      state.field = payload.field;
      state.targetCard = payload.targetCard;
      state.countTurn = payload.countTurn;
      state.winnerId = payload.winnerId;
    },
    resetGameState: (state) => {
      state.field = [];
      state.targetCard = null;
      state.countTurn = 0;
      state.winnerId = null;
      state.error = null;
      state.isRequest = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGame.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(createGame.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(createGame.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = payload.field;
        state.targetCard = payload.targetCard;
        state.countTurn = payload.countTurn;
        state.winnerId = payload.winnerId;
      })
      .addCase(getGame.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(getGame.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(getGame.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = payload.field;
        state.targetCard = payload.targetCard;
        state.countTurn = payload.countTurn;
        state.winnerId = payload.winnerId;
      })
      .addCase(deleteGame.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(deleteGame.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(deleteGame.fulfilled, (state) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = [];
        state.targetCard = null;
        state.countTurn = 0;
        state.winnerId = null;
      })
      .addCase(updateGame.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateGame.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(updateGame.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = payload.field;
        state.targetCard = payload.targetCard;
        state.countTurn = payload.countTurn;
        state.winnerId = payload.winnerId;
      })
      .addCase(incrementCountTurn.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(incrementCountTurn.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(incrementCountTurn.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.countTurn = payload.countTurn;
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
        state.field = payload.game.field;
        state.countTurn = payload.game.countTurn;
        state.targetCard = payload.game.targetCard;
        state.winnerId = payload.game.winnerId;
      })
      .addCase(shuffleField.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(shuffleField.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(shuffleField.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = payload.field;
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
        state.error = null;
        state.field = [];
        state.targetCard = null;
        state.countTurn = 0;
        state.winnerId = null;
      })
      .addCase(updateFieldElement.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateFieldElement.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
        console.log(error)
      })
      .addCase(updateFieldElement.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = payload.field;
        state.targetCard = payload.targetCard;
        state.countTurn = payload.countTurn;
        state.winnerId = payload.winnerId;
      });
  },
});

export const { updateGameState, resetGameState } = gameFieldSlice.actions;
export default gameFieldSlice.reducer;

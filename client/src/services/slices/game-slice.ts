import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TGameState, TUpdateGameState } from "../../types/services-types";
import {
  assignWinner,
  createGame,
  deleteGame,
  getGame,
  incrementCountTurn,
  leaveGame,
  makePlayerMove,
  playAgain,
  resetGame,
  shuffleField,
  startGame,
  updateGame,
} from "../thunks";

export const initialState: TGameState = {
  field: [],
  targetCard: null,
  countTurn: 0,
  winnerId: null,
  error: null,
  endType: null,
  isRequest: false,
  isSuccess: false,
};

const gameFieldSlice = createSlice({
  name: SliceNamespace.Game,
  initialState,
  reducers: {
    updateGameState: (state, { payload }: PayloadAction<TUpdateGameState>) => {
      state.field = payload.field;
      state.targetCard = payload.targetCard;
      state.countTurn = payload.countTurn;
      state.winnerId = payload.winnerId;
      state.endType = payload.endType;
    },
    resetGameState: (state) => {
      state.field = [];
      state.targetCard = null;
      state.countTurn = 0;
      state.winnerId = null;
      state.error = null;
      state.isRequest = false;
      state.isSuccess = false;
      state.endType = null;
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
        state.endType = payload.endType;
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
        state.endType = payload.endType;
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
        state.endType = null;
        state.endType = null;
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
        state.endType = payload.endType;
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
        state.endType = null;
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
        state.endType = null;
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

        state.field = payload.game.field;
        state.targetCard = payload.game.targetCard;
        state.countTurn = payload.game.countTurn;
        state.winnerId = payload.game.winnerId;
        state.endType = payload.game.endType;
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
        state.field = payload.game.field;
        state.targetCard = payload.game.targetCard;
        state.countTurn = payload.game.countTurn;
        state.winnerId = payload.game.winnerId;
        state.endType = payload.game.endType;
      })
      .addCase(startGame.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(playAgain.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(playAgain.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = payload.game.field;
        state.targetCard = payload.game.targetCard;
        state.countTurn = payload.game.countTurn;
        state.winnerId = payload.game.winnerId;
        state.endType = payload.game.endType;
      })
      .addCase(playAgain.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(assignWinner.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(assignWinner.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(assignWinner.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;

        state.field = payload.game.field;
        state.targetCard = payload.game.targetCard;
        state.countTurn = payload.game.countTurn;
        state.winnerId = payload.game.winnerId;
        state.endType = payload.game.endType;
      });
  },
});

export const { updateGameState, resetGameState } = gameFieldSlice.actions;
export default gameFieldSlice.reducer;

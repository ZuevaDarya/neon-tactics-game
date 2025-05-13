import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TGameState, TPlayer } from "../../types/services-types";

const initialState: TGameState = {
  countTurn: 0,
  activePlayer: null,
  winner: null,
};

const gameStateSlice = createSlice({
  name: SliceNamespace.GameSate,
  initialState,
  reducers: {
    increaseCountTurn: (state) => {
      state.countTurn += 1;
    },
    setActivePlayer: (state, { payload }: PayloadAction<TPlayer>) => {
      state.activePlayer = payload;
    },
    setWinner: (state, { payload }: PayloadAction<TPlayer>) => {
      state.winner = payload;
    },
    resetActivePlayer: (state) => {
      state.activePlayer = null;
    }
  },
});

export const { increaseCountTurn, setActivePlayer, setWinner, resetActivePlayer } =
  gameStateSlice.actions;
export default gameStateSlice.reducer;

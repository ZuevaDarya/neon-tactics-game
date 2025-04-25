import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TGameState, TPlayer } from "../../types/services-types";

const initialState: TGameState = {
  countTurn: 0,
  activePlayer: null,
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
    }
  },
});

export const { increaseCountTurn, setActivePlayer } =
  gameStateSlice.actions;
export default gameStateSlice.reducer;

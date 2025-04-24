import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import {
  TAddCardsAction,
  TGameFiledState,
  TSetCardOnPieceAction,
} from "../../types/services-types";

export const initialState: TGameFiledState = {
  field: [],
};

const gameFieldSlice = createSlice({
  name: SliceNamespace.GameField,
  initialState,
  reducers: {
    addCards: (state, { payload }: PayloadAction<TAddCardsAction>) => {
      state.field = payload.cards;
    },
    setCardOnPiece: (state, { payload }: PayloadAction<TSetCardOnPieceAction>) => {
      state.field[payload.idx] = payload.piece;
    },
  },
});

export const { addCards, setCardOnPiece } = gameFieldSlice.actions;
export default gameFieldSlice.reducer;

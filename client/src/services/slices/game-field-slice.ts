import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import {
  TAddCardsAction,
  TGameFiledState,
  TSetCardOnPieceAction,
} from "../../types/services-types";
import { TCard } from '../../types/components-types';

export const initialState: TGameFiledState = {
  field: [],
  targetCard: null,
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
    setTargetCard: (state, { payload }: PayloadAction<TCard>) => {
      state.targetCard = payload;
    },
  },
});

export const { addCards, setCardOnPiece, setTargetCard } = gameFieldSlice.actions;
export default gameFieldSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TCard } from "../../types/components-types";
import {
  TAddCardsAction,
  TCreateFieldResponse,
  TGameFiledState,
  TSetCardOnPieceAction,
  TUpdateGameFieldResponse,
} from "../../types/services-types";
import { createdGameField, deleteGameField, getGameField, updateGameField } from "../thunks";

export const initialState: TGameFiledState = {
  field: [],
  targetCard: null,
  error: null,
  isRequest: false,
  isSuccess: false,
};

const gameFieldSlice = createSlice({
  name: SliceNamespace.GameField,
  initialState,
  reducers: {
    updateGameFieldState: (
      state,
      { payload }: PayloadAction<TUpdateGameFieldResponse | TCreateFieldResponse>
    ) => {
      state.field = payload.field;
      state.targetCard = payload.targetCard;
    },
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
  extraReducers: (builder) => {
    builder
      .addCase(createdGameField.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(createdGameField.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(createdGameField.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = payload.field;
        state.targetCard = payload.targetCard;
      })
      .addCase(getGameField.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(getGameField.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(getGameField.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = payload.field;
        state.targetCard = payload.targetCard;
      })
      .addCase(deleteGameField.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(deleteGameField.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(deleteGameField.fulfilled, (state) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = [];
        state.targetCard = null;
      })
      .addCase(updateGameField.pending, (state) => {
        state.isRequest = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateGameField.rejected, (state, { error }) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.error = String(error.message);
      })
      .addCase(updateGameField.fulfilled, (state, { payload }) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.error = null;
        state.field = payload.field;
        state.targetCard = payload.targetCard;
      });
  },
});

export const { updateGameFieldState, addCards, setCardOnPiece, setTargetCard } =
  gameFieldSlice.actions;
export default gameFieldSlice.reducer;

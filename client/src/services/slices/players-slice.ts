import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TPlayer, TPlayersState } from "../../types/services-types";

const initialState: TPlayersState = {
  players: [],
};

const playersSlice = createSlice({
  name: SliceNamespace.Players,
  initialState,
  reducers: {
    addPlayers: (state, { payload }: PayloadAction<[TPlayer, TPlayer]>) => {
      state.players = payload;
    },
    updatePlayer: (state, { payload }: PayloadAction<TPlayer>) => {
      const idx = state.players.findIndex((player) => player.id === payload.id);
      state.players[idx] = payload;
    },
  },
});

export const { addPlayers, updatePlayer } = playersSlice.actions;
export default playersSlice.reducer;

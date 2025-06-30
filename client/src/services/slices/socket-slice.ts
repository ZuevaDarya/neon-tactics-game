import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamespace } from "../../constants/slice-namespace";
import { TSocketState } from "../../types/services-types";

const initialState: TSocketState = {
  isConnected: false,
  error: null,
  socketId: null,
};

const socketSlice = createSlice({
  initialState,
  name: SliceNamespace.Socket,
  reducers: {
    connect: (state, _action: PayloadAction<{ url: string }>) => {
      state.isConnected = false;
      state.error = null;
      state.socketId = null;
    },
    connected: (state, { payload }: PayloadAction<{ socketId: string }>) => {
      state.isConnected = true;
      state.error = null;
      state.socketId = payload.socketId;
    },
    disconnected: (state) => {
      state.isConnected = false;
      state.socketId = null;
    },
    getError: (state, { payload }: PayloadAction<{ error: string }>) => {
      state.error = payload.error;
    },
  },
});

export const { connect, connected, disconnected, getError} = socketSlice.actions;
export default socketSlice.reducer;

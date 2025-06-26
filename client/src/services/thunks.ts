import { createAsyncThunk } from "@reduxjs/toolkit";
import { socketApi } from "../api/socket-api";
import { API_PATHS } from "../constants/api-constants";
import { SliceNamespace } from "../constants/slice-namespace";
import {
  TCreatePlayer,
  TCreatePlayerWithJoinInRoom,
  TCreateRoom,
  TGetCountPieceResponse,
  TPlayer,
  TPlayerWithRoomResponse,
  TRejectValue,
  TRoomResponse,
} from "../types/services-types";
import request from "./request";

export const createRoom = createAsyncThunk<TRoomResponse, TCreateRoom>(
  `${SliceNamespace.Room}/createRoom`,
  async (creatorId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(creatorId),
    };

    return await request(API_PATHS.rooms, options);
  }
);

export const createPlayerWithCreateRoom = createAsyncThunk<
  TPlayerWithRoomResponse,
  TCreatePlayer,
  TRejectValue
>(`${SliceNamespace.Players}/createPlayerWithCreateRoom`, async (player, { rejectWithValue }) => {
  const socketId = socketApi.getSocketId();

  if (!socketId) {
    return rejectWithValue("Подключение к сокету не установлено");
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "x-socket-id": socketId,
    },
    body: JSON.stringify(player),
  };

  return await request(API_PATHS.playerWithCreateRoom, options);
});

export const createPlayerWithJoinInRoom = createAsyncThunk<
  TPlayerWithRoomResponse,
  TCreatePlayerWithJoinInRoom,
  TRejectValue
>(`${SliceNamespace.Players}/createPlayerWithJoinInRoom`, async (player, { rejectWithValue }) => {
  const socketId = socketApi.getSocketId();

  if (!socketId) {
    return rejectWithValue("Подключение к сокету не установлено");
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "x-socket-id": socketId,
    },
    body: JSON.stringify(player),
  };

  return await request(API_PATHS.playerWithJoinRoom, options);
});

export const getRoom = createAsyncThunk<TRoomResponse, { id: string }>(
  `${SliceNamespace.Players}/getRoom`,
  async ({ id }) => {
    return await request(`${API_PATHS.rooms}/${id}`);
  }
);

export const deleteRoom = createAsyncThunk<void, { id: string }>(
  `${SliceNamespace.Room}/deleteRoom`,
  async ({ id }) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    return await request(`${API_PATHS.rooms}/${id}`, options);
  }
);

export const createPlayer = createAsyncThunk<TPlayer, TCreatePlayer>(
  `${SliceNamespace.Players}/createPlayer`,
  async (player) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(player),
    };

    return await request(API_PATHS.players, options);
  }
);

export const getPlayer = createAsyncThunk<TPlayer, { id: string }>(
  `${SliceNamespace.Players}/getPlayer`,
  async ({ id }) => {
    return await request(`${API_PATHS.players}/${id}`);
  }
);

export const deletePlayer = createAsyncThunk<void, { id: string }>(
  `${SliceNamespace.Room}/deletePlayer`,
  async ({ id }) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    return await request(`${API_PATHS.players}/${id}`, options);
  }
);

export const getPieceCount = createAsyncThunk<TGetCountPieceResponse, { id: string }>(
  `${SliceNamespace.Players}/getPieceCount`,
  async ({ id }) => {
    return await request(`${API_PATHS.players}/${id}/${API_PATHS.pieceCount}`);
  }
);

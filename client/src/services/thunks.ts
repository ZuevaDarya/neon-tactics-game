import { createAsyncThunk } from "@reduxjs/toolkit";
import { SocketApi } from "../api/socket-api";
import { API_PATHS } from "../constants/api-constants";
import { SliceNamespace } from "../constants/slice-namespace";
import {
  TCreatePlayer,
  TCreatePlayerWithJoinInRoom,
  TCreateRoom,
  TPlayer,
  TPlayerWithRoomResponse,
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

export const addPlayer = createAsyncThunk<TPlayer, TCreatePlayer>(
  `${SliceNamespace.Players}/addPlayer`,
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

export const addPlayerWithCreateRoom = createAsyncThunk<TPlayerWithRoomResponse, TCreatePlayer>(
  `${SliceNamespace.Players}/addPlayerWithCreateRoom`,
  async (player) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-socket-id": `${SocketApi.socket?.id}`,
      },
      body: JSON.stringify(player),
    };

    return await request(API_PATHS.playerWithCreateRoom, options);
  }
);

export const addPlayerWithJoinInRoom = createAsyncThunk<
  TPlayerWithRoomResponse,
  TCreatePlayerWithJoinInRoom
>(`${SliceNamespace.Players}/addPlayerWithJoinInRoom`, async (player) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "x-socket-id": `${SocketApi.socket?.id}`,
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

export const getPlayer = createAsyncThunk<TPlayer, { id: string }>(
  `${SliceNamespace.Players}/getPlayer`,
  async ({ id }) => {
    return await request(`${API_PATHS.players}/${id}`);
  }
);

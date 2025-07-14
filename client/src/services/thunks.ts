import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_PATHS } from "../constants/api-constants";
import { SliceNamespace } from "../constants/slice-namespace";
import { SessionStorageKey } from "../constants/storage-keys";
import {
  TAssignPieceTypeResponse,
  TCreateGameResponse,
  TCreatePlayer,
  TCreatePlayerWithJoinInRoom,
  TCreateRoom,
  TGetAllPlayersInRoomResponse,
  TGetCountPieceResponse,
  TPlayer,
  TPlayerWithRoomResponse,
  TRejectValue,
  TRoomResponse,
  TSelectActivePlayerResponse,
  TUpdateGame,
  TUpdateGameResponse,
  TUpdateRoomStatus,
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
  const socketId = sessionStorage.getItem(SessionStorageKey.SocketId);

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
  const socketId = sessionStorage.getItem(SessionStorageKey.SocketId);

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

export const updateRoomStatus = createAsyncThunk<TRoomResponse, TUpdateRoomStatus>(
  `${SliceNamespace.Room}/updateRoomStatus`,
  ({ id, status }) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ status }),
    };

    return request(`${API_PATHS.rooms}/${id}${API_PATHS.roomStatus}`, options);
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

export const deletePlayer = createAsyncThunk<TPlayer, { id: string }>(
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
    return await request(`${API_PATHS.players}/${id}${API_PATHS.pieceCount}`);
  }
);

export const getAllPlayersInRoom = createAsyncThunk<TGetAllPlayersInRoomResponse, { id: string }>(
  `${SliceNamespace.Players}/getAllPlayersInRoom`,
  async ({ id }) => {
    return await request(`${API_PATHS.playersInRoom}/${id}`);
  }
);

export const createGame = createAsyncThunk<TCreateGameResponse, { roomId: string }>(
  `${SliceNamespace.Game}/createGame`,
  async ({ roomId }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ roomId }),
    };
    return await request(`${API_PATHS.game}`, options);
  }
);

export const getGame = createAsyncThunk<TCreateGameResponse, { id: string }>(
  `${SliceNamespace.Game}/getGame`,
  async ({ id }) => {
    return await request(`${API_PATHS.game}/${id}`);
  }
);

export const deleteGame = createAsyncThunk<void, { id: string }>(
  `${SliceNamespace.Game}/deleteGame`,
  async ({ id }) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    return await request(`${API_PATHS.game}/${id}`, options);
  }
);

export const updateGame = createAsyncThunk<TUpdateGameResponse, TUpdateGame>(
  `${SliceNamespace.Game}/updateGameField`,
  async ({ roomId, ...data }) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    return await request(`${API_PATHS.game}/${roomId}`, options);
  }
);

export const assignRandomPieceType = createAsyncThunk<TAssignPieceTypeResponse, { id: string }>(
  `${SliceNamespace.Room}/assignRandomPieceType`,
  async ({ id }) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    return await request(`${API_PATHS.rooms}/${id}${API_PATHS.assignPieceType}`, options);
  }
);

export const selectActivePlayer = createAsyncThunk<TSelectActivePlayerResponse, { id: string }>(
  `${SliceNamespace.Room}/selectActivePlayer`,
  async ({ id }) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    return await request(`${API_PATHS.rooms}/${id}${API_PATHS.selectActivePlayer}`, options);
  }
);

export const decrementPieceCount = createAsyncThunk<TPlayer, { id: string }>(
  `${SliceNamespace.Players}/decrementPieceCount`,
  async ({ id }) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    return await request(`${API_PATHS.players}/${id}${API_PATHS.decrementPiece}`, options);
  }
);

export const changeActiveStatus = createAsyncThunk<TPlayer, { id: string; isActive: boolean }>(
  `${SliceNamespace.Players}/changeActiveStatus`,
  async ({ id, ...data }) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    return await request(`${API_PATHS.players}/${id}${API_PATHS.changeActiveStatus}`, options);
  }
);

export const incrementCountTurn = createAsyncThunk<TUpdateGameResponse, { id: string }>(
  `${SliceNamespace.Game}/incrementCountTurn`,
  async ({ id }) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    return await request(`${API_PATHS.game}/${id}${API_PATHS.incrementCountTurn}`, options);
  }
);

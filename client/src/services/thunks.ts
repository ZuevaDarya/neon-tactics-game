import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_PATHS } from "../constants/api-constants";
import { SliceNamespace } from "../constants/slice-namespace";
import { SessionStorageKey } from "../constants/storage-keys";
import {
  TBasePlayerParam,
  TBaseRoomParam,
  TChangeActiveStatus,
  TCreateGameResponse,
  TCreatePlayer,
  TCreatePlayerWithJoinInRoom,
  TPlayer,
  TPlayerWithRoomResponse,
  TRejectValue,
  TRoomResponse,
  TUpdateGame,
  TUpdateGameResponse,
  TUpdateRoomStatus,
} from "../types/services-types";
import request from "./request";

export const createRoom = createAsyncThunk<TRoomResponse, TBaseRoomParam>(
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

export const getRoom = createAsyncThunk<TRoomResponse, TBaseRoomParam>(
  `${SliceNamespace.Players}/getRoom`,
  async ({ id }) => {
    return await request(`${API_PATHS.rooms}/${id}`);
  }
);

export const deleteRoom = createAsyncThunk<void, TBaseRoomParam>(
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

export const getPlayer = createAsyncThunk<TPlayer, TBasePlayerParam>(
  `${SliceNamespace.Players}/getPlayer`,
  async ({ id }) => {
    return await request(`${API_PATHS.players}/${id}`);
  }
);

export const deletePlayer = createAsyncThunk<TPlayer, TBasePlayerParam>(
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

export const getAllPlayersInRoom = createAsyncThunk<TPlayer[], TBaseRoomParam>(
  `${SliceNamespace.Players}/getAllPlayersInRoom`,
  async ({ id }) => {
    return await request(`${API_PATHS.playersInRoom}/${id}`);
  }
);

export const createGame = createAsyncThunk<TCreateGameResponse, TBaseRoomParam>(
  `${SliceNamespace.Game}/createGame`,
  async ({ id }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ roomId: id }),
    };
    return await request(`${API_PATHS.game}`, options);
  }
);

export const getGame = createAsyncThunk<TCreateGameResponse, TBaseRoomParam>(
  `${SliceNamespace.Game}/getGame`,
  async ({ id }) => {
    return await request(`${API_PATHS.game}/${id}`);
  }
);

export const deleteGame = createAsyncThunk<void, TBaseRoomParam>(
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
  async ({ id, ...data }) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    return await request(`${API_PATHS.game}/${id}`, options);
  }
);

export const assignRandomPieceType = createAsyncThunk<TPlayer[], TBaseRoomParam>(
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

export const selectActivePlayer = createAsyncThunk<TPlayer, TBaseRoomParam>(
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

export const setActivePlayer = createAsyncThunk<TPlayer[], TBaseRoomParam>(
  `${SliceNamespace.Room}/setActivePlayer`,
  async ({ id }) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    return await request(`${API_PATHS.rooms}/${id}${API_PATHS.setActivePlayer}`, options);
  }
);

export const decrementPieceCount = createAsyncThunk<TPlayer, TBasePlayerParam>(
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

export const changeActiveStatus = createAsyncThunk<TPlayer, TChangeActiveStatus>(
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

export const incrementCountTurn = createAsyncThunk<TUpdateGameResponse, TBaseRoomParam>(
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

import { combineReducers } from "@reduxjs/toolkit";
import gameReducer from "./slices/game-slice";
import playersReducer from "./slices/players-slice";
import roomReducer from "./slices/room-slice";
import socketReducer from "./slices/socket-slice";

const rootReducer = combineReducers({
  game: gameReducer,
  players: playersReducer,
  room: roomReducer,
  socket: socketReducer,
});

export default rootReducer;

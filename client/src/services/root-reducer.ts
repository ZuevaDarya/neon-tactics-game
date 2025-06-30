import { combineReducers } from "@reduxjs/toolkit";
import gameFieldReducer from "./slices/game-field-slice";
import gameStateReducer from "./slices/game-state-slice";
import playersReducer from "./slices/players-slice";
import roomReducer from "./slices/room-slice";
import socketReducer from "./slices/socket-slice";

const rootReducer = combineReducers({
  gameField: gameFieldReducer,
  gameState: gameStateReducer,
  players: playersReducer,
  room: roomReducer,
  socket: socketReducer,
});

export default rootReducer;

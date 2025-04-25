import { combineReducers } from "@reduxjs/toolkit";
import gameFieldReducer from "./slices/game-field-slice";
import gameStateReducer from "./slices/game-state-slice";
import playersReducer from "./slices/players-slice";

const rootReducer = combineReducers({
  gameField: gameFieldReducer,
  gameState: gameStateReducer,
  players: playersReducer,
});

export default rootReducer;

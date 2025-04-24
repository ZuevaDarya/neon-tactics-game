import { combineReducers } from "@reduxjs/toolkit";
import gameFieldReducer from "./slices/game-field-slice";

const rootReducer = combineReducers({
  gameField: gameFieldReducer,
});

export default rootReducer;

export const BASE_URL = "http://localhost:3000";
export const DEV_URL = "http://192.168.0.115:3000";

export const API_PATHS = {
  rooms: "/rooms",
  players: "/players",
  playerWithCreateRoom: "/players/create-room",
  playerWithJoinRoom: "/players/join-room",
  playersInRoom: "/players/by-room",
  roomStatus: "/status",
  game: "/game",
  assignPieceType: "/assign-piece-type",
  selectActivePlayer: "/select-active-player",
  setActivePlayer: "/set-active-player",
  gameState: "/game-state",
  decrementPiece: "/decrement-piece",
  changeActiveStatus: "/active-status",
  incrementCountTurn: "/increment-count-turn",
};

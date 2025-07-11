export enum SocketEvent {
  Connect = "connect",
  Disconnect = "disconnect",
  Error = "connect_error",
  JoinRoom = "joined_room",
  CreateRoom = "created_room",
  StartGame = "start_game",
  Redirect = "redirect",
  CreateGameField = "created_game_field",
  AssignPieceType = "assigned_piece_type",
  SelectActivePlayer = "select_active_player",
  UpdateField = "updated_field",
}

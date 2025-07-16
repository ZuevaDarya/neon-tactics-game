export enum SocketEvent {
  JoinRoom = 'joined_room',
  CreateRoom = 'created_room',
  StartGame = 'start_game',
  Redirect = 'redirect',
  CreateGame = 'created_game',
  AssignPieceType = 'assigned_piece_type',
  SelectActivePlayer = 'select_active_player',
  SetActivePlayer = 'set_active_player',
  UpdateGame = 'updated_game',
  IncrementCountTurn = 'increment_count_turn',
  ChangeActiveStatus = 'change_active_status',
  DecrementPieceCount = 'decrement_piece_count',
}

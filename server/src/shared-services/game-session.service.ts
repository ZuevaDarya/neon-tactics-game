import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionOptions } from 'sequelize';
import { DEFAULT_PIECE_COUNT } from 'src/constants/game-constants';
import { GameEndType } from 'src/constants/game-end-type';
import { PieceType } from 'src/constants/piece-type';
import { AssignWinnerDTO } from 'src/game/dto/assign-winner.dto';
import { UpdateFieldElementDTO } from 'src/game/dto/update-field-element.dto';
import { GameService } from 'src/game/game.service';
import { Room } from 'src/room/models/room.model';
import { RoomService } from 'src/room/room.service';
import { WinCheckService } from 'src/shared-services/win-check.service';
import {
  TAssignWinner,
  TCheckGameEnd,
  TMakeMove,
  TPlayAgain,
  TResetGameResponse,
  TStartGame,
} from 'src/types/types';
import { TransactionService } from 'src/utils/services/transaction.service';
import { CreatePlayerDTO } from '../player/dto/create-player.dto';
import { JoinRoomDTO } from '../player/dto/join-room.dto';
import { Player } from '../player/models/player.model';
import { PlayerService } from '../player/player.service';

@Injectable()
export class GameSessionService {
  constructor(
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
    @Inject(forwardRef(() => GameService))
    private readonly gameService: GameService,
    @Inject(forwardRef(() => TransactionService))
    private readonly transactionService: TransactionService,
    @Inject(forwardRef(() => WinCheckService))
    private readonly winCheckService: WinCheckService,
  ) {}

  private validateMove(player: Player, room: Room) {
    if (player.roomId !== room.id) {
      throw new NotFoundException(`Player is not in room`);
    }

    if (!player.isActive) {
      throw new NotFoundException(`Player is not active now`);
    }
  }

  async createWithRoom(playerData: CreatePlayerDTO) {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };

      const player = await this.playerService.create(
        { ...playerData, isCreator: true },
        options,
      );
      const room = await this.roomService.create(
        { creatorId: player.id },
        options,
      );

      await this.playerService.update(player.id, { roomId: room.id }, options);

      await this.playerService.assignAvatarToPlayer(
        player.id,
        room.id,
        options,
      );

      return { player, room };
    });
  }

  async createWithJoinInRoom({ roomId, name }: JoinRoomDTO) {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };

      const player = await this.playerService.create({ name }, options);
      const room = await this.roomService.updatePlayerId(
        roomId,
        player.id,
        options,
      );

      await this.playerService.update(player.id, { roomId: room.id }, options);

      await this.playerService.assignAvatarToPlayer(
        player.id,
        room.id,
        options,
      );

      return { player, room };
    });
  }

  async assignRandomPieceType(roomId: string): Promise<Player[]> {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };
      const random = Math.round(Math.random());

      const room = await this.roomService.findById(roomId, options);

      const player1 = await this.playerService.update(
        room.creatorId,
        { pieceType: random === 0 ? PieceType.Cyan : PieceType.Pink },
        options,
      );
      const player2 = await this.playerService.update(
        room.playerId,
        { pieceType: random === 0 ? PieceType.Pink : PieceType.Cyan },
        options,
      );

      return [player1, player2];
    });
  }

  async selectActivePlayer(roomId: string): Promise<Player> {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };
      const random = Math.round(Math.random());

      const room = await this.roomService.findById(roomId, options);
      const activePlayerId = random === 0 ? room.creatorId : room.playerId;

      return await this.playerService.changeActiveStatus(
        activePlayerId,
        true,
        options,
      );
    });
  }

  async setActivePlayer(roomId: string): Promise<Player[]> {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };
      const players = await this.playerService.getAllInRoom(roomId, options);

      return await Promise.all(
        players.map((player) =>
          this.playerService.update(
            player.id,
            { isActive: !player.isActive },
            options,
          ),
        ),
      );
    });
  }

  async resetGame(roomId: string): Promise<TResetGameResponse> {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };
      const players = await this.playerService.getAllInRoom(roomId, options);

      const updatedPlayers = await Promise.all(
        players.map((player) =>
          this.playerService.update(
            player.id,
            {
              pieceType: null,
              countPiece: DEFAULT_PIECE_COUNT,
              isActive: false,
            },
            options,
          ),
        ),
      );

      const room = await this.roomService.updateRoomStatus(
        roomId,
        'playing',
        options,
      );

      const game = await this.gameService.update(
        roomId,
        {
          field: [],
          targetCard: null,
          winnerId: null,
          countTurn: 0,
          endType: null,
          timeToTurn: null,
        },
        options,
      );

      return { players: updatedPlayers, room, game };
    });
  }

  async leaveGame(roomId: string) {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };
      const players = await this.playerService.getAllInRoom(roomId, options);

      await Promise.all(
        players.map((player) =>
          this.playerService.deleteById(player.id, options),
        ),
      );
      await this.gameService.deleteByRoomId(roomId, options);
      await this.roomService.deleteById(roomId, options);
    });
  }

  async checkGameEnd(
    roomId: string,
    { piece, pieceIdx, playerId }: UpdateFieldElementDTO,
    options?: TransactionOptions,
  ): Promise<TCheckGameEnd> {
    let game = await this.gameService.findByRoomId(roomId, options);

    const isWin = this.winCheckService.checkWin(
      pieceIdx,
      piece.type,
      game.field,
    );

    const isDraw = !isWin && this.winCheckService.checkDraw(game.field);

    if (isWin || isDraw) {
      await this.gameService.update(
        roomId,
        { winnerId: isWin ? playerId : null },
        options,
      );

      await this.roomService.updateRoomStatus(roomId, 'finished', options);
    }

    game = await this.gameService.update(
      roomId,
      { endType: isWin ? GameEndType.Win : isDraw ? GameEndType.Draw : null },
      options,
    );

    return { game };
  }

  async makePlayerMove(
    roomId: string,
    data: UpdateFieldElementDTO,
  ): Promise<TMakeMove | TCheckGameEnd> {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };

      const currentPlayer = await this.playerService.findById(
        data.playerId,
        options,
      );
      const room = await this.roomService.findById(roomId, options);

      this.validateMove(currentPlayer, room);

      await this.gameService.updateFieldElement(roomId, data, options);

      const checkedGameData = await this.checkGameEnd(roomId, data, options);

      if (checkedGameData.game.endType) {
        return checkedGameData;
      }

      const game = await this.gameService.incrementCountTurn(roomId, options);

      const players = await this.setActivePlayer(roomId);
      const activePlayer = players.find((player) => player.isActive);

      if (activePlayer) {
        const hasMoves = this.winCheckService.hasAvailableMoves(
          game.field,
          game.targetCard,
        );

        if (!hasMoves) {
          const winnerPlayer = players.find((player) => !player.isActive);

          if (winnerPlayer) {
            const endedGame = await this.gameService.update(
              roomId,
              { winnerId: winnerPlayer.id, endType: GameEndType.NoMoves },
              options,
            );

            await this.roomService.updateRoomStatus(
              roomId,
              'finished',
              options,
            );

            return {
              game: endedGame,
              players,
              room,
            };
          }
        }
      }

      return {
        game,
        players,
        room,
      };
    });
  }

  async startGame(roomId: string): Promise<TStartGame> {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };

      await this.gameService.create({ roomId }, options);
      const game = await this.gameService.updateTimeToTurn(roomId, options);

      const room = await this.roomService.updateRoomStatus(
        roomId,
        'playing',
        options,
      );

      let players = await this.assignRandomPieceType(roomId);
      const updatedPlayer = await this.selectActivePlayer(roomId);

      players = players.map((player) =>
        player.id === updatedPlayer.id ? updatedPlayer : player,
      );

      return {
        game,
        room,
        players,
      };
    });
  }

  async playAgain(roomId: string): Promise<TPlayAgain> {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };

      await this.resetGame(roomId);

      let players = await this.assignRandomPieceType(roomId);
      const updatedPlayer = await this.selectActivePlayer(roomId);

      players = players.map((player) =>
        player.id === updatedPlayer.id ? updatedPlayer : player,
      );

      await this.gameService.shuffleField(roomId, options);
      const game = await this.gameService.updateTimeToTurn(roomId, options);

      return {
        game,
        players,
      };
    });
  }

  async assignWinner(
    roomId: string,
    { playerId }: AssignWinnerDTO,
  ): Promise<TAssignWinner> {
    return this.transactionService.useTransaction(async (transaction) => {
      const options = { transaction };

      const players = await this.playerService.getAllInRoom(roomId, options);
      const winner = players.filter((player) => player.id !== playerId)[0];

      const game = await this.gameService.update(
        roomId,
        { winnerId: winner.id, endType: GameEndType.GiveUp },
        options,
      );

      return { game };
    });
  }
}

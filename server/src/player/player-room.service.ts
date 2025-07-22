import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DEFAULT_PIECE_COUNT } from 'src/constants/game-constants';
import { PieceType } from 'src/constants/piece-type';
import { GameService } from 'src/game/game.service';
import { RoomService } from 'src/room/room.service';
import { TResetRameResponse } from 'src/types/types';
import { TransactionService } from 'src/utils/services/transaction.service';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { JoinRoomDTO } from './dto/join-room.dto';
import { Player } from './models/player.model';
import { PlayerService } from './player.service';

@Injectable()
export class PlayerRoomService {
  constructor(
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
    @Inject(forwardRef(() => GameService))
    private readonly gameService: GameService,
    @Inject(forwardRef(() => TransactionService))
    private readonly transactionService: TransactionService,
  ) {}

  async createWithRoom(playerData: CreatePlayerDTO) {
    return this.transactionService.useTransaction(async (transaction) => {
      const player = await this.playerService.create(
        { ...playerData, isCreator: true },
        { transaction },
      );
      const room = await this.roomService.create(
        { creatorId: player.id },
        { transaction },
      );

      await this.playerService.update(
        player.id,
        { roomId: room.id },
        { transaction },
      );

      return { player, room };
    });
  }

  async createWithJoinInRoom({ roomId, name }: JoinRoomDTO) {
    return this.transactionService.useTransaction(async (transaction) => {
      const player = await this.playerService.create({ name }, { transaction });
      const room = await this.roomService.updatePlayerId(roomId, player.id, {
        transaction,
      });

      await this.playerService.update(
        player.id,
        { roomId: room.id },
        { transaction },
      );

      return { player, room };
    });
  }

  async assignRandomPieceType(roomId: string): Promise<Player[]> {
    return this.transactionService.useTransaction(async (transaction) => {
      const random = Math.round(Math.random());

      const room = await this.roomService.findById(roomId, { transaction });

      const player1 = await this.playerService.update(
        room.creatorId,
        { pieceType: random === 0 ? PieceType.Red : PieceType.Black },
        { transaction },
      );
      const player2 = await this.playerService.update(
        room.playerId,
        { pieceType: random === 0 ? PieceType.Black : PieceType.Red },
        { transaction },
      );

      return [player1, player2];
    });
  }

  async selectActivePlayer(roomId: string): Promise<Player> {
    return this.transactionService.useTransaction(async (transaction) => {
      const random = Math.round(Math.random());

      const room = await this.roomService.findById(roomId, { transaction });
      const activePlayerId = random === 0 ? room.creatorId : room.playerId;

      return await this.playerService.changeActiveStatus(activePlayerId, true, {
        transaction,
      });
    });
  }

  async setActivePlayer(roomId: string): Promise<Player[]> {
    return this.transactionService.useTransaction(async (transaction) => {
      const [player1, player2] = await this.playerService.getAllInRoom(roomId, {
        transaction,
      });

      const updatedPlayer1 = await this.playerService.changeActiveStatus(
        player1.id,
        !player1.isActive,
        { transaction },
      );

      const updatedPlayer2 = await this.playerService.changeActiveStatus(
        player2.id,
        !player2.isActive,
        { transaction },
      );

      return [updatedPlayer1, updatedPlayer2];
    });
  }

  async resetGame(roomId: string): Promise<TResetRameResponse> {
    return this.transactionService.useTransaction(async (transaction) => {
      const [player1, player2] = await this.playerService.getAllInRoom(roomId, {
        transaction,
      });

      const updatedPlayer1 = await this.playerService.update(
        player1.id,
        {
          pieceType: null,
          countPiece: DEFAULT_PIECE_COUNT,
          isActive: false,
        },
        { transaction },
      );

      const updatedPlayer2 = await this.playerService.update(
        player2.id,
        {
          pieceType: null,
          countPiece: DEFAULT_PIECE_COUNT,
          isActive: false,
        },
        { transaction },
      );

      const room = await this.roomService.updateRoomStatus(roomId, 'playing', {
        transaction,
      });

      const game = await this.gameService.update(
        roomId,
        {
          field: [],
          targetCard: null,
          winnerId: null,
          countTurn: 0,
        },
        { transaction },
      );

      return { players: [updatedPlayer1, updatedPlayer2], room, game };
    });
  }

  async leaveGame(roomId: string) {
    return this.transactionService.useTransaction(async (transaction) => {
      const [player1, player2] = await this.playerService.getAllInRoom(roomId, {
        transaction,
      });
      await this.playerService.deleteById(player1.id, { transaction });
      await this.playerService.deleteById(player2.id, { transaction });
      await this.gameService.deleteByRoomId(roomId, { transaction });
      await this.roomService.deleteById(roomId, { transaction });
    });
  }
}

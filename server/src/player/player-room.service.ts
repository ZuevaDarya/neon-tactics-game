import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PieceType } from 'src/constants/piece-type';
import { RoomService } from 'src/room/room.service';
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
        { creatorId: player.playerId },
        { transaction },
      );

      await this.playerService.update(
        player.playerId,
        { roomId: room.roomId },
        { transaction },
      );

      return { player, room };
    });
  }

  async createWithJoinInRoom({ roomId, name }: JoinRoomDTO) {
    return this.transactionService.useTransaction(async (transaction) => {
      const player = await this.playerService.create({ name }, { transaction });
      const room = await this.roomService.updatePlayerId(
        roomId,
        player.playerId,
        { transaction },
      );

      await this.playerService.update(
        player.playerId,
        { roomId: room.roomId },
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
}

import { Injectable } from '@nestjs/common';
import { RoomService } from 'src/room/room.service';
import { TransactionService } from 'src/utils-services/transaction.service';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { JoinRoomDTO } from './dto/join-room.dto';
import { PlayerService } from './player.service';

@Injectable()
export class PlayerRoomService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly roomService: RoomService,
    private readonly transactionService: TransactionService,
  ) {}

  async createWithRoom(playerData: CreatePlayerDTO) {
    return this.transactionService.useTransaction(async (transaction) => {
      const player = await this.playerService.create(playerData, {
        transaction,
      });
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
}

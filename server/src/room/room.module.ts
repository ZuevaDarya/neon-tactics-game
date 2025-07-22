import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlayerRoomService } from 'src/player/player-room.service';
import { PlayerModule } from 'src/player/player.module';
import { SocketModule } from 'src/socket/socket.module';
import { TransactionService } from 'src/utils/services/transaction.service';
import { Room } from './models/room.model';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Room]),
    forwardRef(() => PlayerModule),
    forwardRef(() => GameModule),
    SocketModule,
  ],
  providers: [RoomService, PlayerRoomService, TransactionService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}

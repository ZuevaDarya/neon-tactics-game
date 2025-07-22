import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameModule } from 'src/game/game.module';
import { RoomModule } from 'src/room/room.module';
import { SocketModule } from 'src/socket/socket.module';
import { TransactionService } from 'src/utils/services/transaction.service';
import { Player } from './models/player.model';
import { PlayerRoomService } from './player-room.service';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Player]),
    forwardRef(() => RoomModule),
    forwardRef(() => GameModule),
    SocketModule,
  ],
  providers: [PlayerService, PlayerRoomService, TransactionService],
  controllers: [PlayerController],
  exports: [PlayerService],
})
export class PlayerModule {}

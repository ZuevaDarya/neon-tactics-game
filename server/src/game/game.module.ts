import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlayerRoomService } from 'src/player/player-room.service';
import { PlayerModule } from 'src/player/player.module';
import { RoomModule } from 'src/room/room.module';
import { SocketModule } from 'src/socket/socket.module';
import { TransactionService } from 'src/utils/services/transaction.service';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from './models/game.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Game]),
    forwardRef(() => PlayerModule),
    forwardRef(() => RoomModule),
    SocketModule,
  ],
  providers: [GameService, PlayerRoomService, TransactionService],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}

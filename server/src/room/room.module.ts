import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameModule } from 'src/game/game.module';
import { PlayerModule } from 'src/player/player.module';
import { GameSessionService } from 'src/shared-services/game-session.service';
import { SocketModule } from 'src/socket/socket.module';
import { TransactionService } from 'src/utils/services/transaction.service';
import { Room } from './models/room.model';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Room]),
    forwardRef(() => PlayerModule),
    forwardRef(() => GameModule),
    SocketModule,
  ],
  providers: [RoomService, GameSessionService, TransactionService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}

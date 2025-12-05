import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameSessionModule } from 'src/game-session/game-session.module';
import { PlayerModule } from 'src/player/player.module';
import { RoomModule } from 'src/room/room.module';
import { TurnTimerService } from 'src/shared-services/turn-time.service';
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
    forwardRef(() => GameSessionModule),
    SocketModule,
  ],
  providers: [GameService, TransactionService, TurnTimerService],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}

import { forwardRef, Module } from '@nestjs/common';
import { GameModule } from 'src/game/game.module';
import { PlayerModule } from 'src/player/player.module';
import { RoomModule } from 'src/room/room.module';
import { WinCheckService } from 'src/shared-services/win-check.service';
import { TransactionService } from 'src/utils/services/transaction.service';
import { GameSessionService } from './game-session.service';

@Module({
  imports: [
    forwardRef(() => PlayerModule),
    forwardRef(() => RoomModule),
    forwardRef(() => GameModule),
  ],
  providers: [TransactionService, GameSessionService, WinCheckService],
  exports: [GameSessionService],
})
export class GameSessionModule {}

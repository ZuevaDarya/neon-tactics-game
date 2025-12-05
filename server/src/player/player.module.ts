import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameSessionModule } from 'src/game-session/game-session.module';
import { GameModule } from 'src/game/game.module';
import { RoomModule } from 'src/room/room.module';
import { AvatarService } from 'src/shared-services/avatar.service';
import { WinCheckService } from 'src/shared-services/win-check.service';
import { SocketModule } from 'src/socket/socket.module';
import { TransactionService } from 'src/utils/services/transaction.service';
import { Player } from './models/player.model';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Player]),
    forwardRef(() => RoomModule),
    forwardRef(() => GameModule),
    forwardRef(() => GameSessionModule),
    SocketModule,
  ],
  providers: [
    PlayerService,
    TransactionService,
    AvatarService,
    WinCheckService,
  ],
  controllers: [PlayerController],
  exports: [PlayerService, AvatarService, WinCheckService],
})
export class PlayerModule {}

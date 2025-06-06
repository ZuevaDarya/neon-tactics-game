import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomModule } from 'src/room/room.module';
import { TransactionService } from 'src/transaction/transaction.service';
import { Player } from './models/player.model';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [RoomModule, SequelizeModule.forFeature([Player])],
  providers: [PlayerService, TransactionService],
  controllers: [PlayerController],
  exports: [PlayerService],
})
export class PlayerModule {}

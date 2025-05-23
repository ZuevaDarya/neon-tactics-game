import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Player } from './models/player.model';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [SequelizeModule.forFeature([Player])],
  providers: [PlayerService],
  controllers: [PlayerController],
  exports: [PlayerService],
})
export class PlayerModule {}

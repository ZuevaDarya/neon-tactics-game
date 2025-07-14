import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocketModule } from 'src/socket/socket.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from './models/game.model';

@Module({
  imports: [SequelizeModule.forFeature([Game]), SocketModule],
  providers: [GameService],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}

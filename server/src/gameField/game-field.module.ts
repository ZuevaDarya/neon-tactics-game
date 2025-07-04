import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocketModule } from 'src/socket/socket.module';
import { GameFieldController } from './game-field.controller';
import { GameFieldService } from './game-field.service';
import { GameField } from './models/game-field.model';

@Module({
  imports: [SequelizeModule.forFeature([GameField]), SocketModule],
  providers: [GameFieldService],
  controllers: [GameFieldController],
  exports: [GameFieldService],
})
export class GameFieldModule {}

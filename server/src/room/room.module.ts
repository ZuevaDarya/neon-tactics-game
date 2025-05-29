import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './models/room.model';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [SequelizeModule.forFeature([Room])],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}

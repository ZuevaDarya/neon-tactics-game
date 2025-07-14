import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    PlayerModule,
    RoomModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

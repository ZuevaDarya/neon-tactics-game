import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MigrationService } from './database/migration.service';
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
  providers: [MigrationService],
})
export class AppModule implements OnModuleInit {
  constructor(private migrationService: MigrationService) {}

  async onModuleInit() {
    if (process.env.NODE_ENV !== 'production') {
      const results = await this.migrationService.runMigrations();

      const failedMigrations = results.filter((result) => !result.success);
      if (failedMigrations.length > 0) {
        console.error('Some migrations failed:', failedMigrations);
      }
    }
  }
}

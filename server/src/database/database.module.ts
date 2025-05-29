import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Player } from 'src/player/models/player.model';
import { Room } from 'src/room/models/room.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        models: [Player, Room],
        autoLoadModels: true,
        synchronize: configService.get('DB_SYNC'),
        logging: (msg) => {
          console.log(`[SEQUELIZE LOG]: ${msg}`);
        },
        ssl: true,
        dialectOptions: {
          ssl: {
            rejectUnauthorized: false,
            ca: configService.get('CERT') as string,
          },
        },
      }),
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}

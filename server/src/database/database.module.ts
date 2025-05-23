import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
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
})
export class DatabaseModule {}

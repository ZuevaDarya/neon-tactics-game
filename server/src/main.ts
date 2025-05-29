import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = +configService.get('APP_PORT') || 3000;

  await app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

void bootstrap();

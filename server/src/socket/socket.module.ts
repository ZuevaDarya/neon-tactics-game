import { forwardRef, Module } from '@nestjs/common';
import { GameSessionModule } from 'src/game-session/game-session.module';
import { SocketService } from './socket.service';

@Module({
  imports: [forwardRef(() => GameSessionModule)],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}

import { Injectable } from '@nestjs/common';

@Injectable()
export class TurnTimerService {
  private readonly TURN_DURATION_SEC = 1 * 60;
  private readonly TURN_DURATION_MS = this.TURN_DURATION_SEC * 1000;

  getTurnDurationSec() {
    return this.TURN_DURATION_SEC;
  }

  getTurnDurationMs() {
    return this.TURN_DURATION_MS;
  }

  generateTurnDeadline() {
    return Date.now() + this.TURN_DURATION_MS;
  }
}

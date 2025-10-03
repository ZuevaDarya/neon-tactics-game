import { IsNotEmpty, IsString } from 'class-validator';

export class AssignWinnerDTO {
  @IsString()
  @IsNotEmpty()
  playerId: string;
}

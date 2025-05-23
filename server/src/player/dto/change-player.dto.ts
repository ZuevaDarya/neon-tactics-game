import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChangePlayer {
  @IsNotEmpty()
  @IsString()
  readonly playerId: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsNumber()
  countPiece: number;

  @IsNotEmpty()
  @IsString()
  readonly pieceType: 'red' | 'black';

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}

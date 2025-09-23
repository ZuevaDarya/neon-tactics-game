import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TGameFieldPiece } from 'src/types/types';

export class UpdateFieldElementDTO {
  @IsNumber()
  @IsNotEmpty()
  pieceIdx: number;

  @IsNotEmpty()
  piece: TGameFieldPiece;

  @IsString()
  @IsNotEmpty()
  playerId: string;
}

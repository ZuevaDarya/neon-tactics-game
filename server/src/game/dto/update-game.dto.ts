import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { GameEndType } from 'src/constants/game-end-type';
import { TCard, TGameField } from 'src/types/types';

export class UpdateGameDTO {
  @IsOptional()
  field?: TGameField;

  @IsOptional()
  targetCard?: TCard | null;

  @IsNumber()
  @IsOptional()
  countTurn?: number;

  @IsUUID()
  @IsOptional()
  winnerId?: string | null;

  @IsOptional()
  @IsEnum(GameEndType)
  endType?: GameEndType | null;
}

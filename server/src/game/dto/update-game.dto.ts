import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { TCard, TGameFiled } from 'src/types/types';

export class UpdateGameDTO {
  @IsOptional()
  field?: TGameFiled;

  @IsOptional()
  targetCard?: TCard | null;

  @IsNumber()
  @IsOptional()
  countTurn?: number;

  @IsUUID()
  @IsOptional()
  winnerId?: string | null;
}

import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsUUID, Length, Max, Min } from 'sequelize-typescript';
import { DEFAULT_PIECE_COUNT } from 'src/constants/game-constants';
import { PieceType } from 'src/constants/piece-type';
import { TPieceType } from 'src/types/types';

export class CreatePlayerDTO {
  @IsUUID(4)
  @IsNotEmpty()
  readonly playerId: string;

  @IsString()
  @IsNotEmpty()
  @Length({ min: 3, max: 20 })
  readonly name: string;

  @IsString()
  @Length({ min: 8, max: 8 })
  @IsNotEmpty()
  readonly roomId: string;

  @IsNumber()
  @Min(0)
  @Max(DEFAULT_PIECE_COUNT)
  @IsNotEmpty()
  @Type(() => Number)
  countPiece: number;

  @IsEnum(PieceType)
  @IsNotEmpty()
  readonly pieceType: TPieceType;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  isActive: boolean = false;
}

import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { DEFAULT_PIECE_COUNT } from 'src/constants/game-constants';
import { PieceType } from 'src/constants/piece-type';

export class UpdatePlayerDTO {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(8, 8)
  roomId?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(DEFAULT_PIECE_COUNT)
  countPiece?: number;

  @IsOptional()
  @IsEnum(PieceType)
  pieceType?: PieceType | null;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isCreator?: boolean;

  @IsOptional()
  @IsString()
  avatarPath?: string;
}

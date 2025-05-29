import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { RoomStatus } from 'src/constants/room-status';
import { TRoomStatus } from 'src/types/types';

export class CreateRoomDTO {
  @IsString()
  @Length(8, 8)
  @IsNotEmpty()
  readonly roomId: string;

  @IsUUID(4)
  @IsNotEmpty()
  readonly creatorId: string;

  @IsUUID(4)
  @IsOptional()
  playerId?: string;

  @IsEnum(RoomStatus)
  @IsNotEmpty()
  status: TRoomStatus = RoomStatus.Waiting;
}

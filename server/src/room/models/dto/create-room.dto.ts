import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRoomDTO {
  // @IsString()
  // @Length(8, 8)
  // @IsNotEmpty()
  // readonly roomId: string;

  @IsUUID(4)
  @IsNotEmpty()
  creatorId: string;

  //   @IsUUID(4)
  //   @IsOptional()
  //   playerId?: string;

  //   @IsEnum(RoomStatus)
  //   @IsNotEmpty()
  //   status: TRoomStatus = RoomStatus.Waiting;
}

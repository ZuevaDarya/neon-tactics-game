import { IsNotEmpty, IsString, Length } from 'class-validator';

export class JoinRoomDTO {
  @IsNotEmpty()
  @Length(2, 12)
  name: string;

  @IsString()
  @Length(8, 8)
  roomId: string;
}

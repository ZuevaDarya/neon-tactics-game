import { IsNotEmpty, IsString, Length } from 'class-validator';

export class JoinRoomDTO {
  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  @IsString()
  @Length(8, 8)
  roomId: string;
}

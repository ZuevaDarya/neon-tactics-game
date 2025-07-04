import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRoomDTO {
  @IsUUID(4)
  @IsNotEmpty()
  creatorId: string;
}

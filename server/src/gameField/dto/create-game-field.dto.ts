import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGameFieldDTO {
  @IsString()
  @Length(8, 8)
  @IsNotEmpty()
  roomId: string;
}

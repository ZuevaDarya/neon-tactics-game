import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePlayerDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  @IsOptional()
  @IsBoolean()
  isCreator?: boolean;
}

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
  @Length(2, 12)
  name: string;

  @IsOptional()
  @IsBoolean()
  isCreator?: boolean;
}

import { IsNotEmpty } from 'class-validator';
import { TCard, TGameFiled } from 'src/types/types';

export class UpdateGameFieldDTO {
  @IsNotEmpty()
  field?: TGameFiled;

  @IsNotEmpty()
  targetCard?: TCard;
}

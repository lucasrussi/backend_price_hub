import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { State } from '../entities/state.entity';

export class CreateStateDto extends State {
  @IsNumber()
  id?: number;

  @MaxLength(255)
  @MinLength(3)
  @IsString()
  desc_state: string;

  @MaxLength(5)
  @MinLength(2)
  @IsString()
  desc_state_short: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateStateDto } from './create-state.dto';
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateStateDto extends PartialType(CreateStateDto) {
  @IsNumber()
  id?:number;

  @MaxLength(255)
  @MinLength(3)
  @IsString()
  desc_state?:string;

  @MaxLength(5)
  @MinLength(2)
  @IsString()
  desc_state_short?:string;
}

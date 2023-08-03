import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @IsNumber()
  id?: number;

  @MaxLength(2000)
  @MinLength(3)
  @IsString()
  desc_city: string;

  @IsNumber()
  stateId: number;
}

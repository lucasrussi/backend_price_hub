import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { City } from "../entities/city.entity";

export class CreateCityDto extends City{
  @IsNumber()
  id?: number;

  @MaxLength(2000)
  @MinLength(3)
  @IsString()
  desc_city: string;

  @IsNumber()
  stateId: number;
}

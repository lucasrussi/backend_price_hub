import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { Market } from "../entities/market.entity";

export class CreateMarketDto extends Market {
  
  @MaxLength(2000)
  @MinLength(3)
  @IsString()
  desc_market: string;

  @IsNumber()
  cityId: number;
}

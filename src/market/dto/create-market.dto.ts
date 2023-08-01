import { IsString } from 'class-validator'
import { Market } from "../entities/market.entity";

export class CreateMarketDto extends Market {
  
  @IsString()
  desc_market: string;
}

import { MarketEstab } from '../entities/market-estab.entity';
import { IsString, IsNumber, MaxLength, MinLength } from 'class-validator';
export class CreateMarketEstabDto extends MarketEstab {
  @MaxLength(2000)
  @MinLength(3)
  @IsString()
  desc_market_estab: string;

  @MaxLength(2000)
  @MinLength(3)
  @IsString()
  street: string;

  @IsNumber()
  marketId: number;

  @IsNumber()
  cityId: number;
}

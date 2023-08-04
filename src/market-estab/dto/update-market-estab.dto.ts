import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketEstabDto } from './create-market-estab.dto';
import { IsString, IsNumber, MaxLength, MinLength } from 'class-validator';

export class UpdateMarketEstabDto extends PartialType(CreateMarketEstabDto) {
  @IsNumber()
  id?: number;

  @MaxLength(2000)
  @MinLength(3)
  @IsString()
  desc_market_estab?: string;

  @MaxLength(2000)
  @MinLength(3)
  @IsString()
  street?: string;

  @IsNumber()
  marketId?: number;

  @IsNumber()
  cityId?: number;
}

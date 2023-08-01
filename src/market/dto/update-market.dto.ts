import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketDto } from './create-market.dto';
import { IsString, MaxLength, MinLength, IsNumber } from 'class-validator'
export class UpdateMarketDto extends PartialType(CreateMarketDto) {

  @IsNumber()
  id?: number;

  @MaxLength(2000)
  @MinLength(3)
  @IsString()
  desc_market?: string;
}

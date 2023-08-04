import { PartialType } from '@nestjs/mapped-types';
import { CreateItemHistDto } from './create-item-hist.dto';
import { IsNumber } from 'class-validator';

export class UpdateItemHistDto extends PartialType(CreateItemHistDto) {
  @IsNumber()
  id?: number;

  @IsNumber()
  price?: number;

  @IsNumber()
  itemTypeId?: number;
}

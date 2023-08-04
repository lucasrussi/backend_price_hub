import { PartialType } from '@nestjs/mapped-types';
import { CreateItemTypeDto } from './create-item-type.dto';
import { IsString, MaxLength, MinLength, IsNumber } from 'class-validator';

export class UpdateItemTypeDto extends PartialType(CreateItemTypeDto) {
  @IsNumber()
  id?: number;

  @MaxLength(255)
  @MinLength(3)
  @IsString()
  desc_type?: string;

  @IsNumber()
  categoryId?: number;
}

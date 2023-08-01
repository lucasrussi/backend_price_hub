import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsString, MaxLength, MinLength, IsNumber } from "class-validator";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNumber()
  id?: number;

  @MaxLength(255)
  @MinLength(3)
  @IsString()
  desc_category?: string;

}

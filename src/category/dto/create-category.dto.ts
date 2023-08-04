import { IsString, MaxLength, MinLength } from 'class-validator';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto extends Category {
  @MaxLength(255)
  @MinLength(3)
  @IsString()
  desc_category: string;
}

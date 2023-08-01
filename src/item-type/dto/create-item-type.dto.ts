import { ItemType } from "../entities/item-type.entity";
import { IsString, MaxLength, MinLength, IsNumber } from "class-validator";
export class CreateItemTypeDto extends ItemType{
  
  @MaxLength(255)
  @MinLength(3)
  @IsString()
  desc_type: string;

  @IsNumber()
  categoryId: number;
}

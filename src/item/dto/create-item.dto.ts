import { IsNumber } from 'class-validator';
import { Item } from '../entities/item.entity';

export class CreateItemDto extends Item {
  @IsNumber()
  price: number;

  @IsNumber()
  itemTypeId: number;

  @IsNumber()
  marketEstabId: number;
}

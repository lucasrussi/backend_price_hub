import { ItemHist } from '../entities/item-hist.entity';
import { IsNumber } from 'class-validator';

export class CreateItemHistDto extends ItemHist {
  @IsNumber()
  price: number;

  @IsNumber()
  itemTypeId: number;
}

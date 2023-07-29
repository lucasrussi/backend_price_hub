import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/item/schemas/item.schema';
import { CreateItemDto } from './dto/create_item.dto';




@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name)
    private itemModel: Model<Item>
  ){}

   
  
  public async create(createItem:CreateItemDto):Promise<boolean>{
    try {
      (await this.itemModel.create(createItem)).save();
      return true
    } catch (error) {
      console.error(error);
      return false
    }
  }

  public async findAll(): Promise<Item[]>{
    return this.itemModel.find().exec();
  }


}

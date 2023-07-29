import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateItemDto } from './dto/create_item.dto';
import { ItemService } from './item.service';
import { Item } from './schemas/item.schema';






@Controller('item')
export class ItemController {

  constructor (
    private readonly itemService:ItemService
  ){}



@Post()
async createItem(@Body() createItem: CreateItemDto): Promise<boolean>{
  try {
    await this.itemService.create(createItem);
    return true;
  } catch (error) {
    console.error(error)
    return false
  }
}


@Get()
async findAll():Promise<Item[]> {
  return await this.itemService.findAll();
}





}

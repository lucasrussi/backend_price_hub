import { Controller, Get, Post, Body } from '@nestjs/common';

import { ItemService } from './item.service';

@Controller('item')
export class ItemController {

  constructor (
    private readonly itemService:ItemService
  ){}



@Post()
async createItem(): Promise<boolean>{
  try {
    
    return true;
  } catch (error) {
    console.error(error)
    return false
  }
}


@Get()
async findAll():Promise<void> {
  
}

}

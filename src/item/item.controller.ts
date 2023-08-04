import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get(':itemTypeId')
  async findAll(@Param('itemTypeId') itemTypeId: number) {
    return this.itemService.findAll(+itemTypeId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.itemService.remove(+id);
  }
}

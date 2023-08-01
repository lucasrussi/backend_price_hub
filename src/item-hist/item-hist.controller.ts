import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemHistService } from './item-hist.service';
import { CreateItemHistDto } from './dto/create-item-hist.dto';
import { UpdateItemHistDto } from './dto/update-item-hist.dto';

@Controller('item-hist')
export class ItemHistController {
  constructor(private readonly itemHistService: ItemHistService) {}

  @Post()
  create(@Body() createItemHistDto: CreateItemHistDto) {
    return this.itemHistService.create(createItemHistDto);
  }

  @Get()
  findAll() {
    return this.itemHistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemHistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemHistDto: UpdateItemHistDto) {
    return this.itemHistService.update(+id, updateItemHistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemHistService.remove(+id);
  }
}

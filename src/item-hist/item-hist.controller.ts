import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Get(':itemTypeId')
  findAll(@Param('itemTypeId') itemTypeId: number) {
    return this.itemHistService.findAll(+itemTypeId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itemHistService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateItemHistDto: UpdateItemHistDto,
  ) {
    return this.itemHistService.update(+id, updateItemHistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemHistService.remove(+id);
  }
}

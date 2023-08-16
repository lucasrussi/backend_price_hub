import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { FindItemType } from './interface/find-item-type.interface';

@Controller('item-type')
export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Post()
  async create(@Body() createItemTypeDto: CreateItemTypeDto): Promise<boolean> {
    return await this.itemTypeService.create(createItemTypeDto);
  }

  @Get(':categoryId')
  async findAll(
    @Param('categoryId') categoryId: number,
  ): Promise<FindItemType[] | boolean> {
    return await this.itemTypeService.findAll(+categoryId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FindItemType | boolean> {
    return await this.itemTypeService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateItemTypeDto: UpdateItemTypeDto,
  ): Promise<FindItemType | boolean> {
    return await this.itemTypeService.update(+id, updateItemTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return await this.itemTypeService.remove(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindItemType } from './interface/find-item-type.interface';

@Injectable()
export class ItemTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemTypeDto: CreateItemTypeDto): Promise<boolean> {
    try {
      await this.prisma.itemType.create({ data: createItemTypeDto });
      return true;
    } catch (error) {
      console.log(`[create - ItemType] - ${error}`);
      return false;
    }
  }

  async findAll(categoryId: number): Promise<FindItemType[] | boolean> {
    try {
      const itemTypes = await this.prisma.itemType.findMany({
        where: {
          categoryId: categoryId,
        },
      });
      return itemTypes;
    } catch (error) {
      console.log(`[findAll - ItemType] - ${error}`);
      return false;
    }
  }

  async findOne(id: number): Promise<FindItemType | boolean> {
    try {
      const itemType = await this.prisma.itemType.findUnique({
        where: {
          id: id,
        },
      });
      return itemType;
    } catch (error) {
      console.log(`[findOne - ItemType] - ${error}`);
      return false;
    }
  }

  async update(
    id: number,
    updateItemTypeDto: UpdateItemTypeDto,
  ): Promise<FindItemType | boolean> {
    try {
      const itemType = await this.prisma.itemType.update({
        data: updateItemTypeDto,
        where: {
          id: id,
        },
      });
      return itemType;
    } catch (error) {
      console.log(`[update - ItemType] - ${error}`);
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.itemType.delete({
        where: { id: id },
      });
      return true;
    } catch (error) {
      console.log(`[delete - ItemType] - ${error}`);
      return false;
    }
  }
}

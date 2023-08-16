import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindItem } from './interface/find-item.interface';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto): Promise<boolean> {
    try {
      await this.prisma.item.create({ data: createItemDto });
      return true;
    } catch (error) {
      console.error(`[create - ItemService] - ${error}`);
      return false;
    }
  }

  async findAll(itemTypeId: number): Promise<FindItem[] | boolean> {
    try {
      const items = await this.prisma.item.findMany({
        select: {
          id: true,
          price: true,
          itemTypeId: true,
        },
        where: {
          itemTypeId: itemTypeId,
        },
      });
      return items;
    } catch (error) {
      console.log(`[findAll - ItemService] - ${error}`);
      return false;
    }
  }

  async findOne(id: number): Promise<FindItem | boolean> {
    try {
      const item = await this.prisma.item.findUnique({
        where: { id: id },
      });
      return item;
    } catch (error) {
      console.log(`[findOne - ItemService] - ${error}`);
      return false;
    }
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
  ): Promise<FindItem | boolean> {
    try {
      const item = await this.prisma.item.update({
        select: {
          id: true,
          price: true,
          itemTypeId: true,
        },
        where: { id: id },
        data: updateItemDto,
      });

      return item;
    } catch (error) {
      console.log(`[update - ItemService] - ${error}`);
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.item.delete({ where: { id: id } });
      return true;
    } catch (error) {
      console.log(`[delete - ItemService] - ${error}`);
      return false;
    }
  }
}

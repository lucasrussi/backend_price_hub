import { Injectable } from '@nestjs/common';
import { CreateItemHistDto } from './dto/create-item-hist.dto';
import { UpdateItemHistDto } from './dto/update-item-hist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindItemHist } from './interface/find-item-hist.interface';

@Injectable()
export class ItemHistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemHistDto: CreateItemHistDto): Promise<boolean> {
    try {
      await this.prisma.itemHist.create({ data: createItemHistDto });
      return true;
    } catch (error) {
      console.error(`[create - ItemHistService] - ${error}`);
      return false;
    }
  }

  async findAll(itemTypeId: number): Promise<FindItemHist[] | boolean> {
    try {
      const items = await this.prisma.itemHist.findMany({
        select: {
          id: true,
          price: true,
          itemTypeId: true,
          marketEstabId: true,
        },
        where: {
          itemTypeId: itemTypeId,
        },
      });
      return items;
    } catch (error) {
      console.log(`[findAll - ItemHistService] - ${error}`);
      return false;
    }
  }

  async findOne(id: number): Promise<FindItemHist | boolean> {
    try {
      const item = await this.prisma.itemHist.findUnique({
        where: { id: id },
      });
      return item;
    } catch (error) {
      console.log(`[findOne - ItemHistService] - ${error}`);
      return false;
    }
  }

  async update(
    id: number,
    updateItemHistDto: UpdateItemHistDto,
  ): Promise<FindItemHist | boolean> {
    try {
      const item = await this.prisma.itemHist.update({
        select: {
          id: true,
          price: true,
          itemTypeId: true,
          marketEstabId: true,
        },
        where: { id: id },
        data: updateItemHistDto,
      });

      return item;
    } catch (error) {
      console.log(`[update - ItemHistService] - ${error}`);
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.itemHist.delete({ where: { id: id } });
      return true;
    } catch (error) {
      console.log(`[delete - ItemHistService] - ${error}`);
      return false;
    }
  }
}

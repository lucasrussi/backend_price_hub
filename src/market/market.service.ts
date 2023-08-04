import { Injectable } from '@nestjs/common';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindMarket } from './interface/find-market.interface';

@Injectable()
export class MarketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMarketDto: CreateMarketDto): Promise<boolean> {
    try {
      await this.prisma.market.create({
        data: createMarketDto,
      });
      return true;
    } catch (error) {
      console.error(`[create - MarketService] - ${error}`);
      return false;
    }
  }

  async findAll(cityId: number): Promise<FindMarket[] | boolean> {
    try {
      const markets = await this.prisma.market.findMany({
        where: {
          cityId: cityId,
        },
      });
      return markets;
    } catch (error) {
      console.log(`[findAll - MarketService] - ${error}`);
      return false;
    }
  }

  async findOne(id: number): Promise<FindMarket | boolean> {
    try {
      const markets = await this.prisma.market.findUnique({
        where: {
          id: id,
        },
      });
      return markets;
    } catch (error) {
      console.log(`[findOne - MarketService] - ${error}`);
      return false;
    }
  }

  async update(
    id: number,
    updateMarketDto: UpdateMarketDto,
  ): Promise<FindMarket | boolean> {
    try {
      const market = await this.prisma.market.update({
        data: updateMarketDto,
        where: {
          id: id,
        },
      });
      return market;
    } catch (error) {
      console.log(`[update - MarketService] - ${error}`);
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.market.delete({ where: { id: id } });
      return true;
    } catch (error) {
      console.log(`[delete - MarketService] - ${error}`);
      return false;
    }
  }
}

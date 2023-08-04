import { Injectable } from '@nestjs/common';
import { CreateMarketEstabDto } from './dto/create-market-estab.dto';
import { UpdateMarketEstabDto } from './dto/update-market-estab.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindMarketEstab } from './interface/find-market-estab.interface';

@Injectable()
export class MarketEstabService {

  constructor(private readonly prisma:PrismaService){}

  async create(createMarketEstabDto: CreateMarketEstabDto):Promise<boolean> {
    try {
      await this.prisma.marketEstab.create(
        {
          data:createMarketEstabDto
        }
      )
      return true;
    } catch (error) {
      console.error(`[create - MarketEstabService] - ${error}`);
      return false;
    }
  }

  async findAll(marketId: number, cityId:number): Promise<FindMarketEstab[] | boolean> {
    try {
      const marketEstab = await this.prisma.marketEstab.findMany({
        where:{
          cityId:cityId,
          marketId:marketId
        },
        select:{
          id:true,
          desc_market_estab:true,
          street:true
        }
      });
      return marketEstab
    } catch (error) {
      console.log(`[findAll - MarketEstabService] - ${error}`);
      return false;
    }
  }

  async findOne(id: number): Promise<FindMarketEstab | boolean> {
    try {
      const marketEstab = await this.prisma.marketEstab.findUnique({
        where:{
          id:id
        },
        select:{
          id:true,
          desc_market_estab:true,
          street:true
        }
      });
      return marketEstab
    } catch (error) {
      console.log(`[findOne - MarketEstabService] - ${error}`);
      return false;
    }
  }

  async update(id: number, updateMarketEstabDto: UpdateMarketEstabDto): Promise<FindMarketEstab | boolean> {
    try {
      const marketEstab = await this.prisma.marketEstab.update({
        data:updateMarketEstabDto,
        where:{
          id:id
        }
      });
      return marketEstab;
    } catch (error) {
      console.log(`[update - MarketEstabService] - ${error}`);
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.marketEstab.delete({ where: { id: id } });
      return true;
    } catch (error) {
      console.log(`[delete - MarketEstabService] - ${error}`);
      return false;
    }
  }
}

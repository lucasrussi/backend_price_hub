import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketService } from './market.service';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { FindMarket } from './interface/find-market.interface';



@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post()
  async create(@Body() createMarketDto: CreateMarketDto): Promise<boolean> {
    return await this.marketService.create(createMarketDto);
  }

  @Get(':cityId')
  async findAll(@Param('cityId') cityId:number): Promise<FindMarket[] | boolean > {
    return await this.marketService.findAll(+cityId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FindMarket | boolean>{
    return await this.marketService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMarketDto: UpdateMarketDto): Promise <FindMarket | boolean> {
    return await this.marketService.update(+id, updateMarketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return await this.marketService.remove(+id);
  }
}

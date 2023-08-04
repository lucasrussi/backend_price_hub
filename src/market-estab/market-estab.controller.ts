import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MarketEstabService } from './market-estab.service';
import { CreateMarketEstabDto } from './dto/create-market-estab.dto';
import { UpdateMarketEstabDto } from './dto/update-market-estab.dto';
import { FindMarketEstab } from './interface/find-market-estab.interface';

@Controller('market-estab')
export class MarketEstabController {
  constructor(private readonly marketEstabService: MarketEstabService) {}

  @Post()
  async create(@Body() createMarketEstabDto: CreateMarketEstabDto): Promise<boolean> {
    return await this.marketEstabService.create(createMarketEstabDto);
  }

  @Get(':marketId/:cityId')
  async findAll(@Param('marketId') marketId:number, @Param('cityId') cityId:number) {
    return await this.marketEstabService.findAll(+marketId,+cityId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FindMarketEstab | boolean> {
    return await this.marketEstabService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMarketEstabDto: UpdateMarketEstabDto,
  ): Promise<FindMarketEstab | boolean> {
    return await this.marketEstabService.update(+id, updateMarketEstabDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return await this.marketEstabService.remove(+id);
  }
}

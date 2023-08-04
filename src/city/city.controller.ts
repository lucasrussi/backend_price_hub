import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { FindCity } from './interface/find-city.interface';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<boolean> {
    return this.cityService.create(createCityDto);
  }

  @Get(':stateId')
  async findAll(@Param('stateId') stateId:number): Promise<FindCity[] | boolean> {
    return await this.cityService.findAll(+stateId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindCity | boolean> {
    return await this.cityService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto): Promise<FindCity | boolean> {
    return await this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.cityService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { FindState } from './interface/find-state.interface';
import { FindStateWithCity } from './interface/find-state-with-city.interface';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  async create(@Body() createStateDto: CreateStateDto): Promise<boolean> {
    return await this.stateService.create(createStateDto);
  }

  @Get()
  async findAll(): Promise<FindState[] | boolean> {
    return await this.stateService.findAll();
  }
  @Get('findAllWithCity')
  async findAllWithCity(): Promise<FindStateWithCity[] | boolean> {
    return await this.stateService.findAllWithCity();
  }
  @Get('findOne/:id')
  async findOne(@Param('id') id: number): Promise<FindState | boolean> {
    return await this.stateService.findOne(+id);
  }
  @Get('findAllWithCity/:id')
  async findOneWithCity(
    @Param('id') id: number,
  ): Promise<FindStateWithCity | boolean> {
    return await this.stateService.findOneWithCity(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStateDto: UpdateStateDto,
  ): Promise<FindState | boolean> {
    return await this.stateService.update(+id, updateStateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return await this.stateService.remove(+id);
  }
}

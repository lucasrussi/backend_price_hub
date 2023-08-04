import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindState } from './interface/find-state.interface';

@Injectable()
export class StateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStateDto: CreateStateDto): Promise<boolean> {
    try {
      await this.prisma.state.create({
        data: createStateDto,
      });
      return true;
    } catch (error) {
      console.error(`[create - StateService] - ${error}`);
      return false;
    }
  }

  async findAll(): Promise<FindState[] | boolean> {
    try {
      const states = this.prisma.state.findMany();
      return states;
    } catch (error) {
      console.log(`[findAll - StateService] - ${error}`);
      return false;
    }
  }

  async findOne(id: number): Promise<FindState | boolean> {
    try {
      const state = await this.prisma.state.findUnique({
        where: {
          id: id,
        },
      });
      return state;
    } catch (error) {
      console.log(`[findOne - StateService] - ${error}`);
      return false;
    }
  }

  async update(id: number, updateStateDto: UpdateStateDto) {
    try {
      const state = await this.prisma.state.update({
        data: updateStateDto,
        where: {
          id: id,
        },
      });
      return state;
    } catch (error) {
      console.log(`[update - StateService] - ${error}`);
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.state.delete({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      console.log(`[delete - StateService] - ${error}`);
      return false;
    }
  }
}

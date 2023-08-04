import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindCity } from './interface/find-city.interface';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCityDto: CreateCityDto): Promise<boolean> {
    try {
      await this.prisma.city.create({
        data: createCityDto,
      });
      return true;
    } catch (error) {
      console.error(`[create - CityService] - ${error}`);
      return false;
    }
  }

  async findAll(stateId: number): Promise<FindCity[] | boolean> {
    try {
      const citys = await this.prisma.city.findMany({
        where: {
          stateId: stateId,
        },
        select: {
          id: true,
          desc_city: true,
        },
      });
      return citys;
    } catch (error) {
      console.log(`[findAll - CityService] - ${error}`);
      return false;
    }
  }

  async findOne(id: number): Promise<FindCity | boolean> {
    try {
      const city = await this.prisma.city.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          desc_city: true,
        },
      });
      return city;
    } catch (error) {
      console.log(`[findOne - CityService] - ${error}`);
      return false;
    }
  }

  async update(
    id: number,
    updateCityDto: UpdateCityDto,
  ): Promise<FindCity | boolean> {
    try {
      const city = await this.prisma.city.update({
        data: updateCityDto,
        where: {
          id: id,
        },
        select: {
          id: true,
          desc_city: true,
        },
      });
      return city;
    } catch (error) {
      console.log(`[update - CityService] - ${error}`);
      return false;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.city.delete({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      console.log(`[delete - CityService] - ${error}`);
      return false;
    }
  }
}

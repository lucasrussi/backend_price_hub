import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindCategory } from './interface/find-category.interface';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma:PrismaService){}

  async create(createCategoryDto: CreateCategoryDto): Promise<boolean> {
    try {
      await this.prisma.category.create({data:createCategoryDto});
      return true;
    } catch (error) {
      console.error(`[create - CategoryService] - ${error}`);
      return false;
    }
  }

  async findAll(): Promise<FindCategory[] | boolean> {
    try {
      const categories = await this.prisma.category.findMany({
        select:{
          id:true,
          desc_category:true
        }
      })
      return categories
    } catch (error) {
      console.error(`[findAll - CategoryService] - ${error}`);
      return false;
    }
  }

  async findOne(id: number): Promise<FindCategory | boolean> {
    try {
      const category = await this.prisma.category.findUnique({
        select:{
          id:true,
          desc_category:true
        },
        where:{id:id}
      });
      return category
    } catch (error) {
      console.error(`[findOne - CategoryService] - ${error}`);
      return false;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<FindCategory | boolean> {
    try {
      const category = await this.prisma.category.update({
        select:{
          id:true,
          desc_category:true
        },
        data:updateCategoryDto,
        where:{id:id}
      });
      return category
    } catch (error) {
      console.error(`[update - CategoryService] - ${error}`);
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.category.delete({
        where:{id:id}
      })
      return true
    } catch (error) {
      console.error(`[delete - CategoryService] - ${error}`);
      return false;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateItemHistDto } from './dto/create-item-hist.dto';
import { UpdateItemHistDto } from './dto/update-item-hist.dto';

@Injectable()
export class ItemHistService {
  create(createItemHistDto: CreateItemHistDto) {
    return 'This action adds a new itemHist';
  }

  findAll() {
    return `This action returns all itemHist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemHist`;
  }

  update(id: number, updateItemHistDto: UpdateItemHistDto) {
    return `This action updates a #${id} itemHist`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemHist`;
  }
}

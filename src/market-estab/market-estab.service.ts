import { Injectable } from '@nestjs/common';
import { CreateMarketEstabDto } from './dto/create-market-estab.dto';
import { UpdateMarketEstabDto } from './dto/update-market-estab.dto';

@Injectable()
export class MarketEstabService {
  create(createMarketEstabDto: CreateMarketEstabDto) {
    return 'This action adds a new marketEstab';
  }

  findAll() {
    return `This action returns all marketEstab`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marketEstab`;
  }

  update(id: number, updateMarketEstabDto: UpdateMarketEstabDto) {
    return `This action updates a #${id} marketEstab`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketEstab`;
  }
}

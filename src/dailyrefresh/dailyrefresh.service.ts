import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DailyRefreshService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(cityId: number) {
    try {
      const response = await this.prisma.city.findMany({
        select: {
          desc_city: true,
          market: {
            select: {
              id: true,
              desc_market: true,
              marketEstab: {
                select: {
                  id: true,
                  desc_market_estab: true,
                  street: true,
                  item: {
                    select: {
                      id: true,
                      price: true,
                      itemType: {
                        select: {
                          id: true,
                          desc_type: true,
                          category: {
                            select: {
                              id: true,
                              desc_category: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          id: cityId,
        },
      });
      return response;
    } catch (error) {
      console.error(`[findAll - DailyRefreshService] - ${error}`);
      return false;
    }
  }
}

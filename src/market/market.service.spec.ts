import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { MarketService } from './market.service';

const fakeMarket = [
  {
    desc_market: 'Supermarket 1',
    cityId: 1,
  },
  {
    desc_market: 'Supermarket 2',
    cityId: 1,
  },
  {
    desc_market: 'Supermarket 3',
    cityId: 1,
  },
];

const createFakemarket = {
  desc_market: 'Supermarket 4',
  cityId: 1,
};

const prismaMock = {
  market: {
    create: jest.fn().mockReturnValue(true),
    findMany: jest.fn().mockReturnValue(fakeMarket),
    findUnique: jest.fn().mockReturnValue(fakeMarket[0]),
    update: jest.fn().mockReturnValue(fakeMarket[0]),
    delete: jest.fn().mockReturnValue(true),
  },
};

describe('MarketService', () => {
  let service: MarketService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<MarketService>(MarketService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('Create', () => {
    it('Should create a new market', async () => {
      const response = await service.create(createFakemarket);
      expect(response).toBe(true);
      expect(prisma.market.create).toHaveBeenCalledTimes(1);
      expect(prisma.market.create).toHaveBeenCalledWith({
        data: createFakemarket,
      });
    });
  });

  describe('FindAll', () => {
    it('Should return an array of market in the state', async () => {
      const response = await service.findAll(1);
      expect(response).toEqual(fakeMarket);
      expect(prisma.market.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () => {
    it('Should return a Single market', async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakeMarket[0]);
      expect(prisma.market.findUnique).toHaveBeenCalledTimes(1);
    });

    it('Should return nothing when market is not found', async () => {
      jest.spyOn(prisma.market, 'findUnique').mockResolvedValue(undefined);

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.market.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('UpdateOne', () => {
    it('Should update a market', async () => {
      const response = await service.update(1, fakeMarket[0]);

      expect(response).toEqual(fakeMarket[0]);
      expect(prisma.market.update).toHaveBeenCalledTimes(1);
    });

    it('Should return FALSE when no market is found', async () => {
      const unexistingmarket = {
        desc_market: 'Andorinha',
        cityId: 6,
      };

      jest.spyOn(prisma.market, 'update').mockRejectedValue(new Error());

      const response = await service.update(5, unexistingmarket);

      expect(response).toBeFalsy();
      expect(prisma.market.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DeleteOne', () => {
    it('Should delete market and return true', async () => {
      const response = await service.remove(1);

      expect(response).toEqual(true);
      expect(prisma.market.delete).toHaveBeenCalledTimes(1);
      expect(prisma.market.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('Should return False if market doesnt exist', async () => {
      jest.spyOn(prisma.market, 'delete').mockRejectedValue(new Error());

      const response = await service.remove(99);

      expect(response).toBeFalsy();
      expect(prisma.market.delete).toHaveBeenCalledTimes(1);
      expect(prisma.market.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});

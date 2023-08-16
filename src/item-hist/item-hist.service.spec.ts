import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ItemHistService } from './item-hist.service';

const fakeItemHist = [
  {
    id: 1,
    price: 1.23,
    itemTypeId: 1,
    marketEstabId: 1,
  },
  {
    id: 2,
    price: 34.2,
    itemTypeId: 1,
    marketEstabId: 1,
  },
  {
    id: 3,
    price: 123.3,
    itemTypeId: 1,
    marketEstabId: 1,
  },
];

const createFakeItemHist = {
  price: 14.78,
  itemTypeId: 1,
  marketEstabId: 1,
};

const prismaMock = {
  itemHist: {
    create: jest.fn().mockReturnValue(true),
    findMany: jest.fn().mockReturnValue(fakeItemHist),
    findUnique: jest.fn().mockReturnValue(fakeItemHist[0]),
    update: jest.fn().mockReturnValue(fakeItemHist[0]),
    delete: jest.fn().mockReturnValue(true),
  },
};

describe('ItemHistService', () => {
  let service: ItemHistService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemHistService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ItemHistService>(ItemHistService);
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
    it('Should create a new itemHist', async () => {
      const response = await service.create(createFakeItemHist);
      expect(response).toBe(true);
      expect(prisma.itemHist.create).toHaveBeenCalledTimes(1);
      expect(prisma.itemHist.create).toHaveBeenCalledWith({
        data: createFakeItemHist,
      });
    });
  });

  describe('FindAll', () => {
    it('Should return an array of itemHist in the state', async () => {
      const response = await service.findAll(1);
      expect(response).toEqual(fakeItemHist);
      expect(prisma.itemHist.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () => {
    it('Should return a Single itemHist', async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakeItemHist[0]);
      expect(prisma.itemHist.findUnique).toHaveBeenCalledTimes(1);
    });

    it('Should return nothing when itemHist is not found', async () => {
      jest.spyOn(prisma.itemHist, 'findUnique').mockResolvedValue(undefined);

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.itemHist.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('UpdateOne', () => {
    it('Should update a item', async () => {
      const response = await service.update(1, fakeItemHist[0]);

      expect(response).toEqual(fakeItemHist[0]);
      expect(prisma.itemHist.update).toHaveBeenCalledTimes(1);
    });

    it('Should return FALSE when no itemHist is found', async () => {
      const unexistingitem = {
        price: 1233.3,
        itemTypeId: 123,
      };

      jest.spyOn(prisma.itemHist, 'update').mockRejectedValue(new Error());

      const response = await service.update(5, unexistingitem);

      expect(response).toBeFalsy();
      expect(prisma.itemHist.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DeleteOne', () => {
    it('Should delete itemHist and return true', async () => {
      const response = await service.remove(1);

      expect(response).toEqual(true);
      expect(prisma.itemHist.delete).toHaveBeenCalledTimes(1);
      expect(prisma.itemHist.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('Should return False if itemHist doesnt exist', async () => {
      jest.spyOn(prisma.itemHist, 'delete').mockRejectedValue(new Error());

      const response = await service.remove(99);

      expect(response).toBeFalsy();
      expect(prisma.itemHist.delete).toHaveBeenCalledTimes(1);
      expect(prisma.itemHist.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});

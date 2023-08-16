import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ItemService } from './item.service';

const fakeItem = [
  {
    price: 12.3,
    itemTypeId: 1,
    marketEstabId: 1,
  },
  {
    price: 15.99,
    itemTypeId: 1,
    marketEstabId: 1,
  },
  {
    price: 14.78,
    itemTypeId: 1,
    marketEstabId: 1,
  },
];

const createFakeitem = {
  price: 14.78,
  itemTypeId: 1,
  marketEstabId: 1,
};

const prismaMock = {
  item: {
    create: jest.fn().mockReturnValue(true),
    findMany: jest.fn().mockReturnValue(fakeItem),
    findUnique: jest.fn().mockReturnValue(fakeItem[0]),
    update: jest.fn().mockReturnValue(fakeItem[0]),
    delete: jest.fn().mockReturnValue(true),
  },
};

describe('ItemService', () => {
  let service: ItemService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
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
    it('Should create a new item', async () => {
      const response = await service.create(createFakeitem);
      expect(response).toBe(true);
      expect(prisma.item.create).toHaveBeenCalledTimes(1);
      expect(prisma.item.create).toHaveBeenCalledWith({
        data: createFakeitem,
      });
    });
  });

  describe('FindAll', () => {
    it('Should return an array of item in the state', async () => {
      const response = await service.findAll(1);
      expect(response).toEqual(fakeItem);
      expect(prisma.item.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () => {
    it('Should return a Single item', async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakeItem[0]);
      expect(prisma.item.findUnique).toHaveBeenCalledTimes(1);
    });

    it('Should return nothing when item is not found', async () => {
      jest.spyOn(prisma.item, 'findUnique').mockResolvedValue(undefined);

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.item.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('UpdateOne', () => {
    it('Should update a item', async () => {
      const response = await service.update(1, fakeItem[0]);

      expect(response).toEqual(fakeItem[0]);
      expect(prisma.item.update).toHaveBeenCalledTimes(1);
    });

    it('Should return FALSE when no item is found', async () => {
      const unexistingitem = {
        price: 125.99,
        itemTypeId: 13,
        marketEstabId: 132,
      };

      jest.spyOn(prisma.item, 'update').mockRejectedValue(new Error());

      const response = await service.update(5, unexistingitem);

      expect(response).toBeFalsy();
      expect(prisma.item.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DeleteOne', () => {
    it('Should delete item and return true', async () => {
      const response = await service.remove(1);

      expect(response).toEqual(true);
      expect(prisma.item.delete).toHaveBeenCalledTimes(1);
      expect(prisma.item.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('Should return False if item doesnt exist', async () => {
      jest.spyOn(prisma.item, 'delete').mockRejectedValue(new Error());

      const response = await service.remove(99);

      expect(response).toBeFalsy();
      expect(prisma.item.delete).toHaveBeenCalledTimes(1);
      expect(prisma.item.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});

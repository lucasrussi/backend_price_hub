import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ItemTypeService } from './item-type.service';

const fakeItemType = [
  {
    desc_type:'Fruit',
    categoryId:1
  },
  {
    desc_type:'Meet',
    categoryId:1
  },
  {
    desc_type:'Bread',
    categoryId:1
  }
]

const createFakeitemtype = {
  desc_type:'Juice',
  categoryId:1
}

const prismaMock = {
  itemType:{
    create:jest.fn().mockReturnValue(true),
    findMany:jest.fn().mockReturnValue(fakeItemType),
    findUnique:jest.fn().mockReturnValue(fakeItemType[0]),
    update: jest.fn().mockReturnValue(fakeItemType[0]),
    delete: jest.fn().mockReturnValue(true),
  }
}

describe('typeItemTypeService', () =>{
  let service: ItemTypeService;
  let prisma: PrismaService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        ItemTypeService,
        {provide:PrismaService, useValue:prismaMock}
      ]
    }).compile()

    service = module.get<ItemTypeService>(ItemTypeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(()=>{
    jest.clearAllMocks();
  });

  it('should be defined', () =>{
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('Create', () =>{
    it('Should create a new itemType', async () =>{
      const response = await service.create(createFakeitemtype);
      expect(response).toBe(true)
      expect(prisma.itemType.create).toHaveBeenCalledTimes(1);
      expect(prisma.itemType.create).toHaveBeenCalledWith({
        data:createFakeitemtype
      });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of itemType in the state', async () =>{
      const response = await service.findAll(1);
      expect(response).toEqual(fakeItemType)
      expect(prisma.itemType.findMany).toHaveBeenCalledTimes(1);
     
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single itemType', async () =>{
      const response = await service.findOne(1);

      expect(response).toEqual(fakeItemType[0]);
      expect(prisma.itemType.findUnique).toHaveBeenCalledTimes(1);
      
    });

    it('Should return nothing when itemType is not found', async () =>{
      jest.spyOn(prisma.itemType,'findUnique').mockResolvedValue(undefined)

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.itemType.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('UpdateOne', () =>{
    it('Should update a itemType', async () =>{
      const response = await service.update(1,fakeItemType[0]);

      expect(response).toEqual(fakeItemType[0]);
      expect(prisma.itemType.update).toHaveBeenCalledTimes(1);
    });


    it('Should return FALSE when no itemType is found', async () =>{
      const unexistingtypeItem = {
        desc_type:'Bread',
        categoryId:131
      }

      jest.spyOn(prisma.itemType,'update').mockRejectedValue(new Error());

      const response = await service.update(5,unexistingtypeItem);

      expect(response).toBeFalsy();
      expect(prisma.itemType.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete itemType and return true', async () =>{
      const response = await service.remove(1);

      expect(response).toEqual(true);
      expect(prisma.itemType.delete).toHaveBeenCalledTimes(1);
      expect(prisma.itemType.delete).toHaveBeenCalledWith({where:{id:1}});
    })

    it('Should return False if itemType doesnt exist', async () =>{
      jest.spyOn(prisma.itemType,'delete').mockRejectedValue(new Error());

      const response = await service.remove(99)

      expect(response).toBeFalsy();
      expect(prisma.itemType.delete).toHaveBeenCalledTimes(1);
      expect(prisma.itemType.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    })
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemTypeController } from './item-type.controller';
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

describe('ItemTypeController', () =>{

  let controller: ItemTypeController;
  let service: ItemTypeService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[ItemTypeController],
      providers:[
        ItemTypeService,
        {provide:PrismaService, useValue:prismaMock}
      ]
    }).compile();
    controller = module.get<ItemTypeController>(ItemTypeController)
    service = module.get<ItemTypeService>(ItemTypeService)
  });

  afterEach(()=>{
    jest.clearAllMocks();
  });

  it('should be defined', () =>{
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  })

  describe('Create', () =>{
    it('Should create a new itemType', async () =>{
      

      const response = await controller.create(createFakeitemtype);

      expect(response).toEqual(true);
      expect(prismaMock.itemType.create).toHaveBeenCalledTimes(1)
      expect(prismaMock.itemType.create).toHaveBeenCalledWith({
        data:createFakeitemtype
      });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of itemType', async () =>{
      
      const response = await controller.findAll(1);

      expect(response).toEqual(fakeItemType);
      expect(prismaMock.itemType.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single itemType',async ()=>{
      const response = await controller.findOne(1);

      expect(response).toEqual(fakeItemType[0]);
      expect(prismaMock.itemType.findUnique).toHaveBeenCalledTimes(1);
      
    });

    it('Should return nothing when itemType is not found', async ()=>{
      jest.spyOn(prismaMock.itemType,'findUnique').mockResolvedValue(undefined);

      const response = await controller.findOne(99);

      expect(response).toBeUndefined();
      expect(prismaMock.itemType.findUnique).toHaveBeenCalledTimes(1);
      
    })
  });

  describe('UpdateOne', () =>{
    it('Should Update a itemType', async () =>{
      const response = await controller.update(1,fakeItemType[0]);
      expect(response).toEqual(fakeItemType[0]);
      expect(prismaMock.itemType.update).toHaveBeenCalledTimes(1);
      
    });

    it('should return FALSE when no itemType is found', async () =>{
      const unexistingtypeItem = {
        desc_type:'Bread',
        categoryId:131
      }

      jest.spyOn(prismaMock.itemType,'update').mockRejectedValue(new Error());

      const response = await controller.update(5,unexistingtypeItem);

      expect(response).toBeFalsy();
      expect(prismaMock.itemType.update).toHaveBeenCalledTimes(1);
      
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete itemType and return true', async () =>{
      const response = await controller.remove(1);

      expect(response).toEqual(true);
      expect(prismaMock.itemType.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.itemType.delete).toHaveBeenCalledWith({where:{id:1}});
    });

    it('Should return False if itemType doesnt exist', async () =>{
      jest.spyOn(prismaMock.itemType,'delete').mockRejectedValue(new Error());

      const response = await controller.remove(99)

      expect(response).toBeFalsy();
      expect(prismaMock.itemType.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.itemType.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

})
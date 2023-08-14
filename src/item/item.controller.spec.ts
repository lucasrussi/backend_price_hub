import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

const fakeItem = [
  {
    price:12.3,
    itemTypeId:1,
    marketEstabId:1
  },
  {
    price:15.99,
    itemTypeId:1,
    marketEstabId:1
  },
  {
    price:14.78,
    itemTypeId:1,
    marketEstabId:1
  }
]

const createFakeitem = {
  price:14.78,
  itemTypeId:1,
  marketEstabId:1
}

const prismaMock = {
  item:{
    create:jest.fn().mockReturnValue(true),
    findMany:jest.fn().mockReturnValue(fakeItem),
    findUnique:jest.fn().mockReturnValue(fakeItem[0]),
    update: jest.fn().mockReturnValue(fakeItem[0]),
    delete: jest.fn().mockReturnValue(true),
  }
}


describe('ItemController', () =>{

  let controller: ItemController;
  let service: ItemService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[ItemController],
      providers:[
        ItemService,
        {provide:PrismaService, useValue:prismaMock}
      ]
    }).compile();
    controller = module.get<ItemController>(ItemController)
    service = module.get<ItemService>(ItemService)
  });

  afterEach(()=>{
    jest.clearAllMocks();
  });

  it('should be defined', () =>{
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  })

  describe('Create', () =>{
    it('Should create a new item', async () =>{
      

      const response = await controller.create(createFakeitem);

      expect(response).toEqual(true);
      expect(prismaMock.item.create).toHaveBeenCalledTimes(1)
      expect(prismaMock.item.create).toHaveBeenCalledWith({
        data:createFakeitem
      });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of item', async () =>{
      
      const response = await controller.findAll(1);

      expect(response).toEqual(fakeItem);
      expect(prismaMock.item.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single item',async ()=>{
      const response = await controller.findOne(1);

      expect(response).toEqual(fakeItem[0]);
      expect(prismaMock.item.findUnique).toHaveBeenCalledTimes(1);
      
    });

    it('Should return nothing when item is not found', async ()=>{
      jest.spyOn(prismaMock.item,'findUnique').mockResolvedValue(undefined);

      const response = await controller.findOne(99);

      expect(response).toBeUndefined();
      expect(prismaMock.item.findUnique).toHaveBeenCalledTimes(1);
      
    })
  });

  describe('UpdateOne', () =>{
    it('Should Update a item', async () =>{
      const response = await controller.update(1,fakeItem[0]);
      expect(response).toEqual(fakeItem[0]);
      expect(prismaMock.item.update).toHaveBeenCalledTimes(1);
      
    });

    it('should return FALSE when no item is found', async () =>{
      const unexistingitem = {
        price:125.99,
        itemTypeId:13,
        marketEstabId:132
      }

      jest.spyOn(prismaMock.item,'update').mockRejectedValue(new Error());

      const response = await controller.update(5,unexistingitem);

      expect(response).toBeFalsy();
      expect(prismaMock.item.update).toHaveBeenCalledTimes(1);
      
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete item and return true', async () =>{
      const response = await controller.remove(1);

      expect(response).toEqual(true);
      expect(prismaMock.item.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.item.delete).toHaveBeenCalledWith({where:{id:1}});
    });

    it('Should return False if item doesnt exist', async () =>{
      jest.spyOn(prismaMock.item,'delete').mockRejectedValue(new Error());

      const response = await controller.remove(99)

      expect(response).toBeFalsy();
      expect(prismaMock.item.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.item.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

})
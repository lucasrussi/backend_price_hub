import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemHistService } from './item-hist.service';
import { ItemHistController } from './item-hist.controller';

const fakeItemHist = [
  {
    id:1,
    price:1.23,
    itemTypeId:1,
    marketEstabId:1
  },
  {
    id:2,
    price:34.2,
    itemTypeId:1,
    marketEstabId:1
  },
  {
    id:3,
    price:123.3,
    itemTypeId:1,
    marketEstabId:1
  }
]

const createFakeItemHist = {
  price:14.78,
  itemTypeId:1,
  marketEstabId:1
}


const prismaMock = {
  itemHist:{
    create:jest.fn().mockReturnValue(true),
    findMany:jest.fn().mockReturnValue(fakeItemHist),
    findUnique:jest.fn().mockReturnValue(fakeItemHist[0]),
    update: jest.fn().mockReturnValue(fakeItemHist[0]),
    delete: jest.fn().mockReturnValue(true),
  }
}

describe('ItemController', () =>{

  let controller: ItemHistController;
  let service: ItemHistService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[ItemHistController],
      providers:[
        ItemHistService,
        {provide:PrismaService, useValue:prismaMock}
      ]
    }).compile();
    controller = module.get<ItemHistController>(ItemHistController)
    service = module.get<ItemHistService>(ItemHistService)
  });

  afterEach(()=>{
    jest.clearAllMocks();
  });

  it('should be defined', () =>{
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  })

  describe('Create', () =>{
    it('Should create a new itemHist', async () =>{
      

      const response = await controller.create(createFakeItemHist);

      expect(response).toEqual(true);
      expect(prismaMock.itemHist.create).toHaveBeenCalledTimes(1)
      expect(prismaMock.itemHist.create).toHaveBeenCalledWith({
        data:createFakeItemHist
      });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of itemHist', async () =>{
      
      const response = await controller.findAll(1);

      expect(response).toEqual(fakeItemHist);
      expect(prismaMock.itemHist.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single itemHist',async ()=>{
      const response = await controller.findOne(1);

      expect(response).toEqual(fakeItemHist[0]);
      expect(prismaMock.itemHist.findUnique).toHaveBeenCalledTimes(1);
      
    });

    it('Should return nothing when item is not found', async ()=>{
      jest.spyOn(prismaMock.itemHist,'findUnique').mockResolvedValue(undefined);

      const response = await controller.findOne(99);

      expect(response).toBeUndefined();
      expect(prismaMock.itemHist.findUnique).toHaveBeenCalledTimes(1);
      
    })
  });

  describe('UpdateOne', () =>{
    it('Should Update a itemHist', async () =>{
      const response = await controller.update(1,fakeItemHist[0]);
      expect(response).toEqual(fakeItemHist[0]);
      expect(prismaMock.itemHist.update).toHaveBeenCalledTimes(1);
      
    });

    it('should return FALSE when no itemHist is found', async () =>{
      const unexistingitem = {
        price:125.99,
        itemTypeId:13,
        marketEstabId:132
      }

      jest.spyOn(prismaMock.itemHist,'update').mockRejectedValue(new Error());

      const response = await controller.update(5,unexistingitem);

      expect(response).toBeFalsy();
      expect(prismaMock.itemHist.update).toHaveBeenCalledTimes(1);
      
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete itemHist and return true', async () =>{
      const response = await controller.remove(1);

      expect(response).toEqual(true);
      expect(prismaMock.itemHist.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.itemHist.delete).toHaveBeenCalledWith({where:{id:1}});
    });

    it('Should return False if itemHist doesnt exist', async () =>{
      jest.spyOn(prismaMock.itemHist,'delete').mockRejectedValue(new Error());

      const response = await controller.remove(99)

      expect(response).toBeFalsy();
      expect(prismaMock.itemHist.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.itemHist.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

})
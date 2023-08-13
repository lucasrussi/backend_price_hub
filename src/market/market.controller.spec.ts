import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';

const fakeMarket = [
  {
    desc_market:'Supermarket 1',
    cityId:1
  },
  {
    desc_market:'Supermarket 2',
    cityId:1
  },
  {
    desc_market:'Supermarket 3',
    cityId:1
  },
]

const createFakemarket = {
  desc_market:'Supermarket 4',
  cityId:1
}

const prismaMock = {
  market:{
    create:jest.fn().mockReturnValue(true),
    findMany:jest.fn().mockReturnValue(fakeMarket),
    findUnique:jest.fn().mockReturnValue(fakeMarket[0]),
    update: jest.fn().mockReturnValue(fakeMarket[0]),
    delete: jest.fn().mockReturnValue(true),
  }
}


describe('MarketController', () =>{

  let controller: MarketController;
  let service: MarketService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[MarketController],
      providers:[
        MarketService,
        {provide:PrismaService, useValue:prismaMock}
      ]
    }).compile();
    controller = module.get<MarketController>(MarketController)
    service = module.get<MarketService>(MarketService)
  });

  afterEach(()=>{
    jest.clearAllMocks();
  });

  it('should be defined', () =>{
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  })

  describe('Create', () =>{
    it('Should create a new market', async () =>{
      

      const response = await controller.create(createFakemarket);

      expect(response).toEqual(true);
      expect(prismaMock.market.create).toHaveBeenCalledTimes(1)
      expect(prismaMock.market.create).toHaveBeenCalledWith({
        data:createFakemarket
      });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of market', async () =>{
      
      const response = await controller.findAll(1);

      expect(response).toEqual(fakeMarket);
      expect(prismaMock.market.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single market',async ()=>{
      const response = await controller.findOne(1);

      expect(response).toEqual(fakeMarket[0]);
      expect(prismaMock.market.findUnique).toHaveBeenCalledTimes(1);
      
    });

    it('Should return nothing when market is not found', async ()=>{
      jest.spyOn(prismaMock.market,'findUnique').mockResolvedValue(undefined);

      const response = await controller.findOne(99);

      expect(response).toBeUndefined();
      expect(prismaMock.market.findUnique).toHaveBeenCalledTimes(1);
      
    })
  });

  describe('UpdateOne', () =>{
    it('Should Update a market', async () =>{
      const response = await controller.update(1,fakeMarket[0]);
      expect(response).toEqual(fakeMarket[0]);
      expect(prismaMock.market.update).toHaveBeenCalledTimes(1);
      
    });

    it('should return FALSE when no market is found', async () =>{
      const unexistingmarket = {
        desc_market:'Andorinha',
        cityId:6
      }

      jest.spyOn(prismaMock.market,'update').mockRejectedValue(new Error());

      const response = await controller.update(5,unexistingmarket);

      expect(response).toBeFalsy();
      expect(prismaMock.market.update).toHaveBeenCalledTimes(1);
      
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete market and return true', async () =>{
      const response = await controller.remove(1);

      expect(response).toEqual(true);
      expect(prismaMock.market.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.market.delete).toHaveBeenCalledWith({where:{id:1}});
    });

    it('Should return False if market doesnt exist', async () =>{
      jest.spyOn(prismaMock.market,'delete').mockRejectedValue(new Error());

      const response = await controller.remove(99)

      expect(response).toBeFalsy();
      expect(prismaMock.market.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.market.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

})
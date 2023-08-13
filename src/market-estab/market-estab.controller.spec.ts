import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { MarketEstabService } from './market-estab.service';
import { MarketEstabController } from './market-estab.controller';

const fakemarketEstab = [
  {
    desc_market_estab:'Estab South',
    street:'Street 1',
    marketId:1,
    cityId:1
  },
  {
    desc_market_estab:'Estab North',
    street:'Street 10',
    marketId:1,
    cityId:1
  },
  {
    desc_market_estab:'Estab Center',
    street:'Street 100',
    marketId:1,
    cityId:1
  },
]

const createFakemarketEstab = {
  desc_market_estab:'Estab Main',
  street:'Street 234',
  marketId:4,
  cityId:23
}

const prismaMock = {
  marketEstab:{
    create:jest.fn().mockReturnValue(true),
    findMany:jest.fn().mockReturnValue(fakemarketEstab),
    findUnique:jest.fn().mockReturnValue(fakemarketEstab[0]),
    update: jest.fn().mockReturnValue(fakemarketEstab[0]),
    delete: jest.fn().mockReturnValue(true),
  }
}

describe('marketEstabController', () =>{

  let controller: MarketEstabController;
  let service: MarketEstabService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[MarketEstabController],
      providers:[
        MarketEstabService,
        {provide:PrismaService, useValue:prismaMock}
      ]
    }).compile();
    controller = module.get<MarketEstabController>(MarketEstabController)
    service = module.get<MarketEstabService>(MarketEstabService)
  });

  afterEach(()=>{
    jest.clearAllMocks();
  });

  it('should be defined', () =>{
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  })

  describe('Create', () =>{
    it('Should create a new marketEstab', async () =>{
      

      const response = await controller.create(createFakemarketEstab);

      expect(response).toEqual(true);
      expect(prismaMock.marketEstab.create).toHaveBeenCalledTimes(1)
      expect(prismaMock.marketEstab.create).toHaveBeenCalledWith({
        data:createFakemarketEstab
      });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of marketEstab', async () =>{
      
      const response = await controller.findAll(1,1);

      expect(response).toEqual(fakemarketEstab);
      expect(prismaMock.marketEstab.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single marketEstab',async ()=>{
      const response = await controller.findOne(1);

      expect(response).toEqual(fakemarketEstab[0]);
      expect(prismaMock.marketEstab.findUnique).toHaveBeenCalledTimes(1);
      
    });

    it('Should return nothing when marketEstab is not found', async ()=>{
      jest.spyOn(prismaMock.marketEstab,'findUnique').mockResolvedValue(undefined);

      const response = await controller.findOne(99);

      expect(response).toBeUndefined();
      expect(prismaMock.marketEstab.findUnique).toHaveBeenCalledTimes(1);
      
    })
  });

  describe('UpdateOne', () =>{
    it('Should Update a marketEstab', async () =>{
      const response = await controller.update(1,fakemarketEstab[0]);
      expect(response).toEqual(fakemarketEstab[0]);
      expect(prismaMock.marketEstab.update).toHaveBeenCalledTimes(1);
      
    });

    it('should return FALSE when no marketEstab is found', async () =>{
      const unexistingmarketEstab = {
        desc_market_estab:'Estab North',
        street:'Street 32310',
        marketId:1354,
        cityId:151
      }

      jest.spyOn(prismaMock.marketEstab,'update').mockRejectedValue(new Error());

      const response = await controller.update(5,unexistingmarketEstab);

      expect(response).toBeFalsy();
      expect(prismaMock.marketEstab.update).toHaveBeenCalledTimes(1);
      
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete marketEstab and return true', async () =>{
      const response = await controller.remove(1);

      expect(response).toEqual(true);
      expect(prismaMock.marketEstab.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.marketEstab.delete).toHaveBeenCalledWith({where:{id:1}});
    });

    it('Should return False if marketEstab doesnt exist', async () =>{
      jest.spyOn(prismaMock.marketEstab,'delete').mockRejectedValue(new Error());

      const response = await controller.remove(99)

      expect(response).toBeFalsy();
      expect(prismaMock.marketEstab.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.marketEstab.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

})
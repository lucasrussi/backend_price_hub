import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { MarketEstabService } from './market-estab.service';

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

describe('marketEstabEstabService', () =>{
  let service: MarketEstabService;
  let prisma: PrismaService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        MarketEstabService,
        {provide:PrismaService, useValue:prismaMock}
      ]
    }).compile()

    service = module.get<MarketEstabService>(MarketEstabService);
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
    it('Should create a new marketEstab', async () =>{
      const response = await service.create(createFakemarketEstab);
      expect(response).toBe(true)
      expect(prisma.marketEstab.create).toHaveBeenCalledTimes(1);
      expect(prisma.marketEstab.create).toHaveBeenCalledWith({
        data:createFakemarketEstab
      });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of marketEstab in the state', async () =>{
      const response = await service.findAll(1,1);
      expect(response).toEqual(fakemarketEstab)
      expect(prisma.marketEstab.findMany).toHaveBeenCalledTimes(1);
     
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single marketEstab', async () =>{
      const response = await service.findOne(1);

      expect(response).toEqual(fakemarketEstab[0]);
      expect(prisma.marketEstab.findUnique).toHaveBeenCalledTimes(1);
      
    });

    it('Should return nothing when marketEstab is not found', async () =>{
      jest.spyOn(prisma.marketEstab,'findUnique').mockResolvedValue(undefined)

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.marketEstab.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('UpdateOne', () =>{
    it('Should update a marketEstab', async () =>{
      const response = await service.update(1,fakemarketEstab[0]);

      expect(response).toEqual(fakemarketEstab[0]);
      expect(prisma.marketEstab.update).toHaveBeenCalledTimes(1);
    });


    it('Should return FALSE when no marketEstab is found', async () =>{
      const unexistingmarketEstab = {
        desc_market_estab:'Estab North',
        street:'Street 32310',
        marketId:1354,
        cityId:151
      }

      jest.spyOn(prisma.marketEstab,'update').mockRejectedValue(new Error());

      const response = await service.update(5,unexistingmarketEstab);

      expect(response).toBeFalsy();
      expect(prisma.marketEstab.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete marketEstab and return true', async () =>{
      const response = await service.remove(1);

      expect(response).toEqual(true);
      expect(prisma.marketEstab.delete).toHaveBeenCalledTimes(1);
      expect(prisma.marketEstab.delete).toHaveBeenCalledWith({where:{id:1}});
    })

    it('Should return False if marketEstab doesnt exist', async () =>{
      jest.spyOn(prisma.marketEstab,'delete').mockRejectedValue(new Error());

      const response = await service.remove(99)

      expect(response).toBeFalsy();
      expect(prisma.marketEstab.delete).toHaveBeenCalledTimes(1);
      expect(prisma.marketEstab.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    })
  });
});
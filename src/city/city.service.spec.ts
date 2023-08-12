import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CityService } from './city.service';


const fakeCity = [
  {
    id:1,
    desc_city:'São Paulo'
    
  },
  {
    id:2,
    desc_city:'Campinas'
    
  },
  {
    id:3,
    desc_city:'Sorocaba'
  },
]

const fakeCityUpdated = {
  id:1,
  desc_city:'São Paulo',
  stateId:1
}

const createFakeCity = {
  desc_city:'Brasilia',
  stateId:5
}

const prismaMock = {
  city:{
    create:jest.fn().mockReturnValue(true),
    findMany:jest.fn().mockReturnValue(fakeCity),
    findUnique:jest.fn().mockReturnValue(fakeCity[0]),
    update: jest.fn().mockReturnValue(fakeCityUpdated),
    delete: jest.fn().mockReturnValue(true),
  }
}

describe('CityService', () =>{
  let service: CityService;
  let prisma: PrismaService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        CityService,
        {provide:PrismaService, useValue:prismaMock}
      ]
    }).compile()

    service = module.get<CityService>(CityService);
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
    it('Should create a new city', async () =>{
      const response = await service.create(createFakeCity);
      expect(response).toBe(true)
      expect(prisma.city.create).toHaveBeenCalledTimes(1);
      expect(prisma.city.create).toHaveBeenCalledWith({
        data:createFakeCity
      });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of city in the state', async () =>{
      const response = await service.findAll(1);
      expect(response).toEqual(fakeCity)
      expect(prisma.city.findMany).toHaveBeenCalledTimes(1);
     
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single City', async () =>{
      const response = await service.findOne(1);

      expect(response).toEqual(fakeCity[0]);
      expect(prisma.city.findUnique).toHaveBeenCalledTimes(1);
      
    });

    it('Should return nothing when City is not found', async () =>{
      jest.spyOn(prisma.city,'findUnique').mockResolvedValue(undefined)

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.city.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('UpdateOne', () =>{
    it('Should update a city', async () =>{
      const response = await service.update(1,fakeCityUpdated);

      expect(response).toEqual(fakeCityUpdated);
      expect(prisma.city.update).toHaveBeenCalledTimes(1);
    });


    it('Should return FALSE when no city is found', async () =>{
      const unexistingCity = {
        id:5,
        desc_city:'Andorinha',
        stateId:6
      }

      jest.spyOn(prisma.city,'update').mockRejectedValue(new Error());

      const response = await service.update(5,unexistingCity);

      expect(response).toBeFalsy();
      expect(prisma.city.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete city and return true', async () =>{
      const response = await service.remove(1);

      expect(response).toEqual(true);
      expect(prisma.city.delete).toHaveBeenCalledTimes(1);
      expect(prisma.city.delete).toHaveBeenCalledWith({where:{id:1}});
    })

    it('Should return False if city doesnt exist', async () =>{
      jest.spyOn(prisma.city,'delete').mockRejectedValue(new Error());

      const response = await service.remove(99)

      expect(response).toBeFalsy();
      expect(prisma.city.delete).toHaveBeenCalledTimes(1);
      expect(prisma.city.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    })
  });










});
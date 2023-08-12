import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CityService } from './city.service';
import { CityController } from './city.controller';

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
    create: jest.fn().mockReturnValue(true),
    findMany: jest.fn().mockReturnValue(fakeCity),
    findUnique: jest.fn().mockReturnValue(fakeCity[0]),
    update: jest.fn().mockReturnValue(fakeCityUpdated),
    delete: jest.fn().mockReturnValue(true),
  }
}

describe('CityController', () =>{

  let controller: CityController;
  let service: CityService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[CityController],
      providers:[
        CityService,
        {provide:PrismaService, useValue:prismaMock}
      ]
    }).compile();
    controller = module.get<CityController>(CityController)
    service = module.get<CityService>(CityService)
  });

  afterEach(()=>{
    jest.clearAllMocks();
  });

  it('should be defined', () =>{
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  })

  describe('Create', () =>{
    it('Should create a new City', async () =>{
      

      const response = await controller.create(createFakeCity);

      expect(response).toEqual(true);
      expect(prismaMock.city.create).toHaveBeenCalledTimes(1)
      expect(prismaMock.city.create).toHaveBeenCalledWith({
        data:createFakeCity
      });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of city', async () =>{
      
      const response = await controller.findAll(1);

      expect(response).toEqual(fakeCity);
      expect(prismaMock.city.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single city',async ()=>{
      const response = await controller.findOne(1);

      expect(response).toEqual(fakeCity[0]);
      expect(prismaMock.city.findUnique).toHaveBeenCalledTimes(1);
      
    });

    it('Should return nothing when city is not found', async ()=>{
      jest.spyOn(prismaMock.city,'findUnique').mockResolvedValue(undefined);

      const response = await controller.findOne(99);

      expect(response).toBeUndefined();
      expect(prismaMock.city.findUnique).toHaveBeenCalledTimes(1);
      
    })
  });

  describe('UpdateOne', () =>{
    it('Should Update a city', async () =>{
      const response = await controller.update(1,fakeCityUpdated);
      expect(response).toEqual(fakeCityUpdated);
      expect(prismaMock.city.update).toHaveBeenCalledTimes(1);
      
    });

    it('should return FALSE when no city is found', async () =>{
      const unexistingCity = {
        id:5,
        desc_city:'Andorinha',
        stateId:6
      }

      jest.spyOn(prismaMock.city,'update').mockRejectedValue(new Error());

      const response = await controller.update(5,unexistingCity);

      expect(response).toBeFalsy();
      expect(prismaMock.city.update).toHaveBeenCalledTimes(1);
      
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete city and return true', async () =>{
      const response = await controller.remove(1);

      expect(response).toEqual(true);
      expect(prismaMock.city.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.city.delete).toHaveBeenCalledWith({where:{id:1}});
    });

    it('Should return False if city doesnt exist', async () =>{
      jest.spyOn(prismaMock.city,'delete').mockRejectedValue(new Error());

      const response = await controller.remove(99)

      expect(response).toBeFalsy();
      expect(prismaMock.city.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.city.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

})
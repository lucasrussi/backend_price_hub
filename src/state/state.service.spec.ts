import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from './state.service';
import { PrismaService } from '../prisma/prisma.service';


const fakeStates = [
  {
    id:1,
    desc_state:'São Paulo',
    desc_state_short:'SP'
  },
  {
    id:2,
    desc_state:'Mians Gerais',
    desc_state_short:'MG'
  },
  {
    id:3,
    desc_state:'Bahia',
    desc_state_short:'BA'
  }
];

const createFakeState = {
  desc_state:'São Paulo',
  desc_state_short:'SP'
}


const prismaMock = {
  state:{
    create: jest.fn().mockReturnValue(true),
    findMany: jest.fn().mockReturnValue(fakeStates),
    findUnique: jest.fn().mockReturnValue(fakeStates[0]),
    update: jest.fn().mockReturnValue(fakeStates[0]),
    delete: jest.fn().mockReturnValue(true),
  }
}


describe('StateService', () =>{
  let service: StateService;
  let prisma: PrismaService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        StateService,
        {provide: PrismaService, useValue: prismaMock}
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    prisma = module.get<PrismaService>(PrismaService);
  });


  afterEach(()=>{
    jest.clearAllMocks();
  });


  it('should be defined', () =>{
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  })

  describe('Create', () =>{
    it('Should create a new State', async () =>{
     const response = await service.create(createFakeState);
     expect(response).toBe(true)
     expect(prisma.state.create).toHaveBeenCalledTimes(1);
     expect(prisma.state.create).toHaveBeenCalledWith({
      data:createFakeState
     });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of state', async () =>{
      const response = await service.findAll();

      expect(response).toEqual(fakeStates);
      expect(prisma.state.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.state.findMany).toHaveBeenCalledWith();
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single State', async () =>{
      const response = await service.findOne(1);

      expect(response).toEqual(fakeStates[0]);
      expect(prisma.state.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.state.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('Should return nothing when State is not found', async () =>{
      jest.spyOn(prisma.state,'findUnique').mockResolvedValue(undefined)

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.state.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.state.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    })
  });

  describe('UpdateOne', () =>{
    it('Should update a state', async () =>{
      const response = await service.update(1,fakeStates[0]);
      expect(response).toEqual(fakeStates[0]);
      expect(prisma.state.update).toHaveBeenCalledTimes(1);
      expect(prisma.state.update).toHaveBeenCalledWith({
        where:{id:1},
        data:fakeStates[0]
      })
    });

    it('Should return FALSE when no state is found', async () =>{
      const unexistingState = {
        id:5,
        desc_state:'Capital',
        desc_state_short:'xS2'
      }

      jest.spyOn(prisma.state,'update').mockRejectedValue(new Error());

      const response = await service.update(5,unexistingState);

      expect(response).toBeFalsy();
      expect(prisma.state.update).toHaveBeenCalledTimes(1);
      expect(prisma.state.update).toHaveBeenCalledWith({
        where:{id:5},
        data:unexistingState
      });
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete state and return true', async () =>{
      const response = await service.remove(1);

      expect(response).toEqual(true);
      expect(prisma.state.delete).toHaveBeenCalledTimes(1);
      expect(prisma.state.delete).toHaveBeenCalledWith({where:{id:1}});
    })

    it('Should return False if State doesnt exist', async () =>{
      jest.spyOn(prisma.state,'delete').mockRejectedValue(new Error());

      const response = await service.remove(99)

      expect(response).toBeFalsy();
      expect(prisma.state.delete).toHaveBeenCalledTimes(1);
      expect(prisma.state.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    })
  });
});
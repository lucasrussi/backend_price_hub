import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { PrismaService } from 'src/prisma/prisma.service';

const fakeStates = [
  {
    id: 1,
    desc_state: 'São Paulo',
    desc_state_short: 'SP',
  },
  {
    id: 2,
    desc_state: 'Mians Gerais',
    desc_state_short: 'MG',
  },
  {
    id: 3,
    desc_state: 'Bahia',
    desc_state_short: 'BA',
  },
];

const createFakeState = {
  desc_state: 'São Paulo',
  desc_state_short: 'SP',
};

const prismaMock = {
  state: {
    create: jest.fn().mockReturnValue(true),
    findMany: jest.fn().mockReturnValue(fakeStates),
    findUnique: jest.fn().mockReturnValue(fakeStates[0]),
    update: jest.fn().mockReturnValue(fakeStates[0]),
    delete: jest.fn().mockReturnValue(true),
  },
};

describe('StateController', () => {
  let controller: StateController;
  let service: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [
        StateService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    controller = module.get<StateController>(StateController);
    service = module.get<StateService>(StateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('Should create a new State', async () => {
      const response = await controller.create(createFakeState);

      expect(response).toEqual(true);
      expect(prismaMock.state.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.state.create).toHaveBeenCalledWith({
        data: createFakeState,
      });
    });
  });

  describe('FindAll', () => {
    it('Should return an array of state', async () => {
      const response = await controller.findAll();

      expect(response).toEqual(fakeStates);
      expect(prismaMock.state.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.state.findMany).toHaveBeenCalledWith();
    });
  });

  describe('FindOne', () => {
    it('Should return a Single State', async () => {
      const response = await controller.findOne(1);

      expect(response).toEqual(fakeStates[0]);
      expect(prismaMock.state.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.state.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('Should return nothing when State is not found', async () => {
      jest.spyOn(prismaMock.state, 'findUnique').mockResolvedValue(undefined);

      const response = await controller.findOne(99);

      expect(response).toBeUndefined();
      expect(prismaMock.state.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.state.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('UpdateOne', () => {
    it('Should Update a state', async () => {
      const response = await controller.update(1, fakeStates[0]);
      expect(response).toEqual(fakeStates[0]);
      expect(prismaMock.state.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.state.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: fakeStates[0],
      });
    });

    it('should return FALSE when no state is found', async () => {
      const unexistingState = {
        id: 5,
        desc_state: 'Capital',
        desc_state_short: 'xS2',
      };

      jest.spyOn(prismaMock.state, 'update').mockRejectedValue(new Error());

      const response = await controller.update(5, unexistingState);

      expect(response).toBeFalsy();
      expect(prismaMock.state.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.state.update).toHaveBeenCalledWith({
        where: { id: 5 },
        data: unexistingState,
      });
    });
  });

  describe('DeleteOne', () => {
    it('Should delete state and return true', async () => {
      const response = await controller.remove(1);

      expect(response).toEqual(true);
      expect(prismaMock.state.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.state.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('Should return False if State doesnt exist', async () => {
      jest.spyOn(prismaMock.state, 'delete').mockRejectedValue(new Error());

      const response = await controller.remove(99);

      expect(response).toBeFalsy();
      expect(prismaMock.state.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.state.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});

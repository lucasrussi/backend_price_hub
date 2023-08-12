import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';


const fakeCategory = [
  {
    id:1,
    desc_category:'Alimento'
  },
  {
    id:2,
    desc_category:'Higiene'
  },
  {
    id:3,
    desc_category:'Festa'
  }
]

const createFakeCategory = {
  desc_category:'Natal'
}

const primaMock = {
  category:{
    create: jest.fn().mockReturnValue(true),
    findMany: jest.fn().mockReturnValue(fakeCategory),
    findUnique: jest.fn().mockReturnValue(fakeCategory[0]),
    update: jest.fn().mockReturnValue(fakeCategory[0]),
    delete: jest.fn().mockReturnValue(true),
  }
}

describe('CategoryService', () =>{
  let service: CategoryService;
  let prisma: PrismaService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        CategoryService,
        {provide: PrismaService, useValue: primaMock}
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
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
    it('Should create a new category', async () =>{
     const response = await service.create(createFakeCategory);
     expect(response).toBe(true)
     expect(prisma.category.create).toHaveBeenCalledTimes(1);
     expect(prisma.category.create).toHaveBeenCalledWith({
      data:createFakeCategory
     });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of category', async () =>{
      const response = await service.findAll();

      expect(response).toEqual(fakeCategory);
      expect(prisma.category.findMany).toHaveBeenCalledTimes(1);
      
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single category', async () =>{
      const response = await service.findOne(1);

      expect(response).toEqual(fakeCategory[0]);
      expect(prisma.category.findUnique).toHaveBeenCalledTimes(1);
    });

    it('Should return nothing when category is not found', async () =>{
      jest.spyOn(prisma.category,'findUnique').mockResolvedValue(undefined)

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.category.findUnique).toHaveBeenCalledTimes(1);
    })
  });


describe('UpdateOne', () =>{
    it('Should update a category', async () =>{
      const response = await service.update(1,fakeCategory[0]);
      expect(response).toEqual(fakeCategory[0]);
      expect(prisma.category.update).toHaveBeenCalledTimes(1);
    });

    it('Should return FALSE when no category is found', async () =>{
      const unexistingcategory = {
        id:5,
        desc_category:'Diet',
      }

      jest.spyOn(prisma.category,'update').mockRejectedValue(new Error());

      const response = await service.update(5,unexistingcategory);

      expect(response).toBeFalsy();
      expect(prisma.category.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete category and return true', async () =>{
      const response = await service.remove(1);

      expect(response).toEqual(true);
      expect(prisma.category.delete).toHaveBeenCalledTimes(1);
      expect(prisma.category.delete).toHaveBeenCalledWith({where:{id:1}});
    })

    it('Should return False if category doesnt exist', async () =>{
      jest.spyOn(prisma.category,'delete').mockRejectedValue(new Error());

      const response = await service.remove(99)

      expect(response).toBeFalsy();
      expect(prisma.category.delete).toHaveBeenCalledTimes(1);
    })
  });
})


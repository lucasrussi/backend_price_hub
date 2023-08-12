import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryController } from './category.controller';
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

const prismaMock = {
  category:{
    create: jest.fn().mockReturnValue(true),
    findMany: jest.fn().mockReturnValue(fakeCategory),
    findUnique: jest.fn().mockReturnValue(fakeCategory[0]),
    update: jest.fn().mockReturnValue(fakeCategory[0]),
    delete: jest.fn().mockReturnValue(true),
  }
}

describe('CategoryController', () =>{

  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[CategoryController],
      providers:[
        CategoryService,
        {provide:PrismaService, useValue:prismaMock}
      ]
    }).compile();
    controller = module.get<CategoryController>(CategoryController)
    service = module.get<CategoryService>(CategoryService)
  });

  afterEach(()=>{
    jest.clearAllMocks();
  });

  it('should be defined', () =>{
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  })

  describe('Create', () =>{
    it('Should create a new category', async () =>{
      

      const response = await controller.create(createFakeCategory);

      expect(response).toEqual(true);
      expect(prismaMock.category.create).toHaveBeenCalledTimes(1)
      expect(prismaMock.category.create).toHaveBeenCalledWith({
        data:createFakeCategory
      });
    });
  });

  describe('FindAll', () =>{
    it('Should return an array of category', async () =>{
      
      const response = await controller.findAll();

      expect(response).toEqual(fakeCategory);
      expect(prismaMock.category.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () =>{
    it('Should return a Single category',async ()=>{
      const response = await controller.findOne(1);

      expect(response).toEqual(fakeCategory[0]);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      
    });

    it('Should return nothing when category is not found', async ()=>{
      jest.spyOn(prismaMock.category,'findUnique').mockResolvedValue(undefined);

      const response = await controller.findOne(99);

      expect(response).toBeUndefined();
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      
    })
  });

  describe('UpdateOne', () =>{
    it('Should Update a category', async () =>{
      const response = await controller.update(1,fakeCategory[0]);
      expect(response).toEqual(fakeCategory[0]);
      expect(prismaMock.category.update).toHaveBeenCalledTimes(1);
      
    });

    it('should return FALSE when no category is found', async () =>{
      const unexistingcategory = {
        id:5,
        desc_category:'Andorinha',
        stateId:6
      }

      jest.spyOn(prismaMock.category,'update').mockRejectedValue(new Error());

      const response = await controller.update(5,unexistingcategory);

      expect(response).toBeFalsy();
      expect(prismaMock.category.update).toHaveBeenCalledTimes(1);
      
    });
  });

  describe('DeleteOne', () =>{
    it('Should delete category and return true', async () =>{
      const response = await controller.remove(1);

      expect(response).toEqual(true);
      expect(prismaMock.category.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.delete).toHaveBeenCalledWith({where:{id:1}});
    });

    it('Should return False if category doesnt exist', async () =>{
      jest.spyOn(prismaMock.category,'delete').mockRejectedValue(new Error());

      const response = await controller.remove(99)

      expect(response).toBeFalsy();
      expect(prismaMock.category.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

})
import { Injectable } from '@nestjs/common';




@Injectable()
export class ItemService {
  
   
  
  public async create():Promise<boolean>{
    try {
      
      return true
    } catch (error) {
      console.error(error);
      return false
    }
  }

  async findAll(): Promise<void>{
  }


}

import { Controller, Get } from '@nestjs/common';
import { ItemFindAll } from './item.interface';
import { Observable, of } from 'rxjs';





@Controller('item')
export class ItemController {



@Get()
findAll():Observable<ItemFindAll[]> {
  return of([
      {
        id:1,
        marketplace:'teste',
        products:[
        {
          id:1,
          desc_item:'teste item',
          value:134,
          date_updated:'now'
        }
        ]
      }
    ]
  )
}





}

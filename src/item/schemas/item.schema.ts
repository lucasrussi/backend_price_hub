import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'


export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {

  @Prop()
  id:number;

  @Prop()
  marketplace:string;

  @Prop()
  products:{
    id:number,
    desc_item:string,
    value:number,
    date_updated:Date
  }[]
}

export const ItemSchema = SchemaFactory.createForClass(Item);
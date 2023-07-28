export interface ItemFindAll{
  id:number,
  marketplace:string,
  products:{
    id:number,
    desc_item:string,
    value:number,
    date_updated:string
  }[]
}
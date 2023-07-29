export class FindItemDto {
  readonly id: number;
  readonly marketplace: string;
  readonly products: {
    id: number,
    desc_item: string,
    value:number,
    date_updated:string
  }[]
}
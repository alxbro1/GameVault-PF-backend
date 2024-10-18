import { IsInt, IsPositive, IsUUID } from "class-validator"

class products {
    @IsUUID()
    id:string

    @IsInt()
    @IsPositive()
    quantity:number
}
export class CreateOrderDto {
  @IsUUID()
  userId: string;

  products: products[];
}
import { IsObject, IsString, MinLength } from 'class-validator';
import { OrderItemCreateDto } from './order-item-create.dto';

export class OrderCreateDto {
  @IsString()
  customer: string;
  @IsObject({ each: true })
  items: OrderItemCreateDto[];
}
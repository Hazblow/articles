import { MinLength } from 'class-validator';

export class OrderCreateDto {
  customer: string;
  items: object[];
  total: number;
}
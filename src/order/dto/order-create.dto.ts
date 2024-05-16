import { MinLength } from 'class-validator';

export class OrderCreateDto {
  customer: string;
  items: string[];
}
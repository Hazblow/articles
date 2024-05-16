import { IsString, MinLength } from 'class-validator';

export class OrderCreateDto {
  @IsString()
  customer: string;
  @IsString()
  items: string[];
}
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderService } from '../use-case/create-order.service';
import { OrderCreateDto } from '../dto/order-create.dto';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
) {}

  @Post()
  createOrder(@Body() data: OrderCreateDto) {
    return this.createOrderService.createOrder(data);
  }
}

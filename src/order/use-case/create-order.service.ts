import { OrderCreateDto } from '../dto/order-create.dto';
import { Order } from '../entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../article/entity/article.entity';
import { Repository } from 'typeorm';
import { OrderItem } from '../entity/order-item.entity';
export class CreateOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  async createOrder(data: OrderCreateDto) {
    try {
      const order = new Order(data);
      for (const item of data.items) {
        const existingItem = order.items.find(i => i.product === item.product);
        if (existingItem) {
          existingItem.quantity += item.quantity;
          order.total += order.calculateTotal(item.quantity, item.price);
        } else {
          const orderItem = new OrderItem(item);
          order.addItem(orderItem);
          order.total += order.calculateTotal(orderItem.quantity, orderItem.price);
        }
      }
      return this.orderRepository.save(order);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating order');
    }
  }
}
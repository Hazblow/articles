import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';

enum OrderStatus {
  CREATED = 'Créée',
  PAID = 'Payée',
  CANCELED = 'Annulée'
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date' , nullable: true})
  updatedAt: Date;

  @Column({ type: 'varchar' })
  customer: string;

  @Column({ type: 'json' })
  items: string[];

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'int' })
  total: number;

  @Column({ type: 'date' , nullable: true})
  paidAt: Date;

  constructor(data: OrderCreateDto) {
    if (data) {
      if (data.items.length > 3) {
        throw new Error('Le nombre d\'items ne peut pas dépasser trois.');
      }
      this.customer = data.customer;
      this.items = data.items;
      this.createdAt = new Date();
      this.updatedAt = null;
      this.status = OrderStatus.CREATED;
      this.total = 10 * data.items.length;
    }
  }

  pay() {
    this.paidAt = new Date();
    this.status = OrderStatus.PAID;
    this.updatedAt = new Date();
  }
}

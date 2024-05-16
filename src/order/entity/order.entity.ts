import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';

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
  items: object[];

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'int' })
  total: number;

  constructor(data: OrderCreateDto) {
    if (data) {
      if (Object.keys(data.items).length > 3) {
        throw new Error('Le nombre d\'items ne peut pas dépasser trois.');
      }
      this.customer = data.customer;
      this.items = data.items;
      this.createdAt = new Date();
      this.updatedAt = null;
      this.status = 'Crée';
      this.total = data.total;
    }
  }
}

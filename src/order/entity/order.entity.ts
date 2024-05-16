import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderUpdateShippingDto } from '../dto/order-update-shipping.dto';
import { OrderUpdateInvoiceAddressDto } from '../dto/order-update-invoice-address.dto';

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

  @Column({ type: 'varchar', nullable: true })
  shippingAddress: string;

  @Column({ type: 'varchar', nullable: true })
  shippingMethod: string;

  @Column({ type: 'varchar', nullable: true })
  invoiceAddress: string;

  @Column({ type: 'date', nullable: true })
  shippingMethodSetAt: Date;

  @Column({ type: 'date', nullable: true })
  invoiceAddressSetAt: Date;


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
      this.paidAt = null;
      this.shippingAddress = null;
      this.shippingMethod = null;
      this.invoiceAddress = null;
      this.shippingMethodSetAt = null;
      this.invoiceAddressSetAt = null;
    }
  }

  pay() {
    this.paidAt = new Date();
    this.status = OrderStatus.PAID;
    this.updatedAt = new Date();
  }

  updateInvoiceAddress(data: OrderUpdateInvoiceAddressDto) {
    this.invoiceAddress = data.invoiceAddress;
    this.invoiceAddressSetAt = new Date();
    this.updatedAt = new Date();
  }

  updateShipping(data: OrderUpdateShippingDto) {
    this.shippingAddress = data.shippingAddress;
    this.shippingMethod = data.shippingMethod;
    this.shippingMethodSetAt = new Date();
    this.updatedAt = new Date();
    if (!this.invoiceAddress) {
      this.invoiceAddress = this.shippingAddress;
      this.invoiceAddressSetAt = new Date();
    }
  }

}

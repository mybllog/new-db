/* eslint-disable prettier/prettier */
// src/clients/entities/client.entity.ts
import { IsNotEmpty } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { Quote } from 'src/quote/entities/quote.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  @IsNotEmpty()
  role: string;
  
  @OneToMany(() => Quote, (quote) => quote.client)
  quotes: Quote[];
  
  @OneToMany(() => Order, (orders) => orders.client)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

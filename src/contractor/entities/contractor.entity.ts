/* eslint-disable prettier/prettier */
// src/contractors/entities/contractor.entity.ts
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

@Entity('contractors')
export class Contractor {
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
  company: string;

  @Column()
  address: string;

  @Column()
  role: string;

  @OneToMany(() => Quote, (quote) => quote.contractor)
  quotes: Quote[];

  @OneToMany(() => Order, (order) => order.contractor) // Define the inverse relation
  orders: Order[]; // Add an `orders` property

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
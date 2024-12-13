/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Contractor } from 'src/contractor/entities/contractor.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quoteId: number;

  @Column('date')
  startDate: string;

  @Column('date')
  endDate: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: 'scheduled' })
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Client, (client) => client.orders, { eager: false }) // Define the relation
  client: Client; // Add a `client` property

  @ManyToOne(() => Contractor, (contractor) => contractor.orders, { eager: false }) // Add Contractor relation
  contractor: Contractor;
}

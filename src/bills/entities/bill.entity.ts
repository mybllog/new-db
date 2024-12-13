/* eslint-disable prettier/prettier */
// src/bills/entities/bill.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bills')
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  dueDate: string;

  @Column({ default: 'unpaid' })
  status: 'unpaid' | 'paid' | 'overdue';

  @Column({ nullable: true })
  description: string; // New description column

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

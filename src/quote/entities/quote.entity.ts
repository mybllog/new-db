/* eslint-disable prettier/prettier */
// src/quotes/entities/quote.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Contractor } from '../../contractor/entities/contractor.entity';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.quotes)
  client: Client;

  @ManyToOne(() => Contractor, (contractor) => contractor.quotes, { eager: true, nullable: true })
  contractor: Contractor;

  @Column()
  propertyDetails: string;

  @Column({ nullable: true })
  additionalNotes?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'enum', enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

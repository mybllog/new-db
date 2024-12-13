/* eslint-disable prettier/prettier */
// src/auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Add name field

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'client' | 'contractor';
}

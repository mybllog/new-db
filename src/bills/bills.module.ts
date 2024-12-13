/* eslint-disable prettier/prettier */
// src/bills/bills.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { Bill } from './entities/bill.entity';
import { JwtAuthGuard } from '../common/guards/jwt.guard'; // Import the guard

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  controllers: [BillsController],
  providers: [BillsService, JwtAuthGuard], // Provide the JWT Guard here if needed
  exports: [BillsService],
})
export class BillsModule {}

/* eslint-disable prettier/prettier */
// src/reports/reports.module.ts
import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { JwtAuthGuard } from '../common/guards/jwt.guard'; // Import the guard

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, JwtAuthGuard], // Provide the JWT Guard here if needed
})
export class ReportsModule {}

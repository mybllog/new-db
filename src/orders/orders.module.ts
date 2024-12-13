/* eslint-disable prettier/prettier */
// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../common/guards/jwt.guard'; // Import the guard
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Order]),
  PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule for dependency injection
      inject: [ConfigService], // Inject ConfigService
      useFactory: async () => ({
        secret: process.env.JWT_KEY, // Use ConfigService for JWT secret
        signOptions: { expiresIn: '1h' }, // Set JWT expiration
      }),
    }),
],
  controllers: [OrdersController],
  providers: [OrdersService, JwtAuthGuard], // Provide the JWT Guard here if needed
  exports: [OrdersService],
})
export class OrdersModule {}

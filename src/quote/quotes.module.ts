/* eslint-disable prettier/prettier */
// src/quotes/quotes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { Quote } from './entities/quote.entity';
import { JwtAuthGuard } from '../common/guards/jwt.guard'; // Import the guard
import { Client } from 'src/client/entities/client.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Quote, Client]),
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
  controllers: [QuotesController],
  providers: [QuotesService, JwtAuthGuard], // Provide the JWT Guard here if needed
  exports: [QuotesService],
})
export class QuotesModule {}
